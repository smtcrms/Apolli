package com.ctrip.apollo.client.loader.impl;

import com.ctrip.apollo.client.model.ApolloRegistry;
import com.ctrip.apollo.client.util.ConfigUtil;
import com.ctrip.apollo.core.environment.Environment;
import com.ctrip.apollo.core.environment.PropertySource;
import com.google.common.base.Function;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.core.env.CompositePropertySource;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RunWith(MockitoJUnitRunner.class)
public class RemoteConfigLoaderTest {
    private RemoteConfigLoader remoteConfigLoader;
    @Mock
    private RestTemplate restTemplate;
    private ConfigUtil configUtil;

    @Before
    public void setUp() {
        configUtil = spy(ConfigUtil.getInstance());
        remoteConfigLoader = spy(new RemoteConfigLoader(restTemplate, configUtil));
    }

    @Test
    public void testLoadPropertySource() throws Exception {
        ApolloRegistry someApolloRegistry = assembleSomeApolloRegistry("someAppId", "someVersion");
        ApolloRegistry anotherApolloRegistry = assembleSomeApolloRegistry("anotherAppId", "anotherVersion");
        CompositePropertySource somePropertySource = mock(CompositePropertySource.class);
        CompositePropertySource anotherPropertySource = mock(CompositePropertySource.class);

        doReturn(Lists.newArrayList(someApolloRegistry, anotherApolloRegistry)).when(configUtil).loadApolloRegistries();
        doReturn(somePropertySource).when(remoteConfigLoader).loadSingleApolloConfig(someApolloRegistry.getAppId(), someApolloRegistry.getVersion());
        doReturn(anotherPropertySource).when(remoteConfigLoader).loadSingleApolloConfig(anotherApolloRegistry.getAppId(), anotherApolloRegistry.getVersion());

        CompositePropertySource result = remoteConfigLoader.loadPropertySource();

        assertEquals(2, result.getPropertySources().size());
        assertTrue(result.getPropertySources().containsAll(Lists.newArrayList(somePropertySource, anotherPropertySource)));
    }

    @Test
    public void testLoadPropertySourceWithNoApolloRegistry() throws Exception {
        doReturn(null).when(configUtil).loadApolloRegistries();

        CompositePropertySource result = remoteConfigLoader.loadPropertySource();

        assertTrue(result.getPropertySources().isEmpty());
    }

    @Test(expected = RuntimeException.class)
    public void testLoadPropertySourceWithError() throws Exception {
        Exception someException = mock(Exception.class);
        ApolloRegistry someApolloRegistry = assembleSomeApolloRegistry("someAppId", "someVersion");
        doReturn(Lists.newArrayList(someApolloRegistry)).when(configUtil).loadApolloRegistries();

        doThrow(someException).when(remoteConfigLoader).loadSingleApolloConfig(someApolloRegistry.getAppId(), someApolloRegistry.getVersion());

        remoteConfigLoader.loadPropertySource();
    }

    @Test
    public void testLoadSingleApolloConfig() throws Exception {
        Environment someRemoteEnv = mock(Environment.class);
        String someSourceName = "someSource";
        String anotherSourceName = "anotherSource";
        Map<String, Object> someMap = Maps.newHashMap();
        PropertySource somePropertySource = mock(PropertySource.class);
        PropertySource anotherPropertySource = mock(PropertySource.class);

        when(somePropertySource.getSource()).thenReturn(someMap);
        when(somePropertySource.getName()).thenReturn(someSourceName);
        when(anotherPropertySource.getSource()).thenReturn(someMap);
        when(anotherPropertySource.getName()).thenReturn(anotherSourceName);
        when(someRemoteEnv.getPropertySources()).thenReturn(Lists.newArrayList(somePropertySource, anotherPropertySource));
        doReturn(someRemoteEnv).when(remoteConfigLoader).getRemoteEnvironment(any(RestTemplate.class), anyString(), anyString(), anyString(), anyString());

        CompositePropertySource result = remoteConfigLoader.loadSingleApolloConfig("someAppId", "someVersion");

        assertEquals(2, result.getPropertySources().size());

        List<String> resultPropertySourceNames = FluentIterable.from(result.getPropertySources()).transform(new Function<org.springframework.core.env.PropertySource<?>, String>() {
            @Override
            public String apply(org.springframework.core.env.PropertySource<?> input) {
                return input.getName();
            }
        }).toList();

        assertTrue(resultPropertySourceNames.containsAll(Lists.newArrayList(someSourceName, anotherSourceName)));
    }

    private ApolloRegistry assembleSomeApolloRegistry(String someAppId, String someVersion) {
        ApolloRegistry someApolloRegistry = new ApolloRegistry();
        someApolloRegistry.setAppId(someAppId);
        someApolloRegistry.setVersion(someVersion);

        return someApolloRegistry;
    }
}
