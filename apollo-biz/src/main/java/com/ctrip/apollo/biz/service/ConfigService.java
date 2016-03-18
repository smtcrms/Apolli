package com.ctrip.apollo.biz.service;

import com.ctrip.apollo.core.model.ApolloConfig;

/**
 * Config Service
 * @author Jason Song(song_s@ctrip.com)
 */
public interface ConfigService {
    /**
     * Load configuration from database
     * @param appId
     * @param clusterName
     * @param versionName
     * @return
     */
    ApolloConfig loadConfig(long appId, String clusterName, String versionName);
}
