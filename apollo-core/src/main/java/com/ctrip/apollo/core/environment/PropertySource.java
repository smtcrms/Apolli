package com.ctrip.apollo.core.environment;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
public class PropertySource {

    private String name;

    private Map<String, Object> source;

    @JsonCreator
    public PropertySource(@JsonProperty("name") String name, @JsonProperty("source") Map<String, Object> source) {
        this.name = name;
        this.source = source;
    }

    public String getName() {
        return name;
    }

    public Map<String, Object>  getSource() {
        return source;
    }

    @Override
    public String toString() {
        return "PropertySource [name=" + name + "]";
    }

}
