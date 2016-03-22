package com.ctrip.apollo.biz.service;

import com.ctrip.apollo.biz.entity.Version;
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

    /**
     * Load Version by appId and versionName from database
     * @param appId
     * @param versionName
     * @return
     */
    Version loadVersionByAppIdAndVersionName(long appId, String versionName);

    /**
     * Load Config by version and clusterName from database
     * @param version
     * @param clusterName
     * @return
     */
    ApolloConfig loadConfigByVersionAndClusterName(Version version, String clusterName);
}
