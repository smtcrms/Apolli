package com.ctrip.apollo.server.controller;

import com.ctrip.apollo.biz.service.ConfigService;
import com.ctrip.apollo.core.model.ApolloConfig;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RestController
public class ConfigController {
    @Resource(name = "configService")
    private ConfigService configService;

    @RequestMapping(value = "/{appId}/{clusterName}/{version:.*}")
    public ApolloConfig queryConfig(@PathVariable long appId,
                                    @PathVariable String clusterName,
                                    @PathVariable String version) {
        return configService.loadConfig(appId, clusterName, version);
    }
}
