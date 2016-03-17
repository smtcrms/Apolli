package com.ctrip.apollo.client.loader.impl;

import com.ctrip.apollo.client.loader.ConfigLoader;
import com.ctrip.apollo.client.model.ApolloRegistry;
import com.ctrip.apollo.client.util.ConfigUtil;
import com.ctrip.apollo.core.environment.Environment;
import com.ctrip.apollo.core.environment.PropertySource;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.CompositePropertySource;
import org.springframework.core.env.MapPropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Load config from remote config server
 *
 * @author Jason Song(song_s@ctrip.com)
 */
public class RemoteConfigLoader implements ConfigLoader {
    private static final String PROPERTY_SOURCE_NAME = "ApolloRemoteConfigProperties";
    private static final Logger logger = LoggerFactory.getLogger(RemoteConfigLoader.class);
    private final RestTemplate restTemplate;
    private final ConfigUtil configUtil;
    private final ExecutorService executorService;
    private final AtomicLong counter;

    public RemoteConfigLoader() {
        this(new RestTemplate(), ConfigUtil.getInstance());
    }

    public RemoteConfigLoader(RestTemplate restTemplate, ConfigUtil configUtil) {
        this.restTemplate = restTemplate;
        this.configUtil = configUtil;
        this.counter = new AtomicLong();
        this.executorService = Executors.newFixedThreadPool(5, new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread thread = new Thread(r, "RemoteConfigLoader-" + counter.incrementAndGet());
                return thread;
            }
        });
    }

    @Override
    public CompositePropertySource loadPropertySource() {
        CompositePropertySource composite = new CompositePropertySource(PROPERTY_SOURCE_NAME);
        List<ApolloRegistry> apolloRegistries;
        try {
            apolloRegistries = configUtil.loadApolloRegistries();
        } catch (IOException e) {
            throw new RuntimeException("Load apollo config registry failed", e);
        }

        if (apolloRegistries == null || apolloRegistries.isEmpty()) {
            logger.warn("No Apollo Registry found!");
            return composite;
        }

        try {
            doLoadRemoteApolloConfig(apolloRegistries, composite);
        } catch (Throwable throwable) {
            throw new RuntimeException("Load remote property source failed", throwable);
        }
        return composite;
    }

    void doLoadRemoteApolloConfig(List<ApolloRegistry> apolloRegistries, CompositePropertySource compositePropertySource) throws Throwable {
        List<Future<CompositePropertySource>> futures = Lists.newArrayList();
        for (final ApolloRegistry apolloRegistry : apolloRegistries) {
            futures.add(executorService.submit(new Callable<CompositePropertySource>() {
                @Override
                public CompositePropertySource call() throws Exception {
                    return loadSingleApolloConfig(apolloRegistry.getAppId(), apolloRegistry.getVersion());
                }
            }));
        }
        for (Future<CompositePropertySource> future : futures) {
            try {
                compositePropertySource.addPropertySource(future.get());
            } catch (ExecutionException e) {
                throw e.getCause();
            }
        }
    }

    CompositePropertySource loadSingleApolloConfig(String appId, String version) {
        CompositePropertySource composite = new CompositePropertySource(appId + "-" + version);
        Environment result =
            this.getRemoteEnvironment(restTemplate, configUtil.getConfigServerUrl(), appId, configUtil.getCluster(), version);
        if (result == null) {
            logger.error("Loaded environment as null...");
            return composite;
        }
        logger.info("Loaded environment: name={}, cluster={}, label={}, version={}", result.getName(), result.getProfiles(), result.getLabel(), result.getVersion());

        for (PropertySource source : result.getPropertySources()) {
            composite.addPropertySource(new MapPropertySource(source.getName(), source.getSource()));
        }
        return composite;
    }

    Environment getRemoteEnvironment(RestTemplate restTemplate, String uri, String name, String cluster, String release) {
        logger.info("Loading environment from {}, name={}, cluster={}, release={}", uri, name, cluster, release);
        String path = "/{name}/{cluster}";
        Object[] args = new String[] {name, cluster};
        if (StringUtils.hasText(release)) {
            args = new String[] {name, cluster, release};
            path = path + "/{release}";
        }
        ResponseEntity<Environment> response = null;

        try {
            // TODO retry
            response = restTemplate.exchange(uri
                + path, HttpMethod.GET, new HttpEntity<Void>((Void) null), Environment.class, args);
        } catch (Exception e) {
            throw e;
        }

        if (response == null || response.getStatusCode() != HttpStatus.OK) {
            return null;
        }
        Environment result = response.getBody();
        return result;
    }

}
