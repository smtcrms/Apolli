package com.ctrip.apollo.demo.controller;

import com.ctrip.apollo.client.ApolloConfigManager;
import com.ctrip.apollo.client.model.ApolloRegistry;
import com.ctrip.apollo.client.util.ConfigUtil;
import com.ctrip.apollo.demo.model.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RestController
@RequestMapping("/demo")
@PropertySource("classpath:application.properties")
public class DemoController {
    @Autowired
    private Environment env;
    @Autowired
    private ApolloConfigManager apolloConfigManager;
    //Apollo config client internal impl, not intended to be use by application, only for this test page
    private ConfigUtil configUtil = ConfigUtil.getInstance();

    @Value("${apollo.foo}")
    private String foo;

    @RequestMapping(value = "/config/{configName:.*}", method = RequestMethod.GET)
    public Config queryConfig(@PathVariable String configName) {
        return new Config(configName, env.getProperty(configName, "undefined"));
    }

    @RequestMapping(value = "/client/registries", method = RequestMethod.GET)
    public List<ApolloRegistry> loadApolloRegistries() throws IOException {
        return configUtil.loadApolloRegistries();
    }
}
