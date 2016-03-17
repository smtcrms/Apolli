package com.ctrip.apollo.client.model;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
public class ApolloRegistry {
    private String appId;
    private String version;

    public String getAppId() {
        return appId;
    }

    public String getVersion() {
        return version;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
