package com.ctrip.apollo.core.environment;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
public class Environment {

    private String name;

    private String[] profiles = new String[0];

    private String label;

    private List<PropertySource> propertySources = new ArrayList<PropertySource>();

    private String version;

    public Environment(String name, String... profiles) {
        this(name, profiles, "master", null);
    }

    @JsonCreator
    public Environment(@JsonProperty("name") String name,
                       @JsonProperty("profiles") String[] profiles,
                       @JsonProperty("label") String label,
                       @JsonProperty("version") String version) {
        super();
        this.name = name;
        this.profiles = profiles;
        this.label = label;
        this.version = version;
    }

    public void add(PropertySource propertySource) {
        this.propertySources.add(propertySource);
    }

    public void addFirst(PropertySource propertySource) {
        this.propertySources.add(0, propertySource);
    }

    public List<PropertySource> getPropertySources() {
        return propertySources;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String[] getProfiles() {
        return profiles;
    }

    public void setProfiles(String[] profiles) {
        this.profiles = profiles;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "Environment [name=" + name + ", profiles=" + Arrays.asList(profiles) + ", label="
            + label + ", propertySources=" + propertySources + ", version=" + version + "]";
    }
}
