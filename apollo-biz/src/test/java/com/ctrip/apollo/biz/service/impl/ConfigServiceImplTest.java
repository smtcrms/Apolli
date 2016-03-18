package com.ctrip.apollo.biz.service.impl;

import com.ctrip.apollo.biz.entity.ReleaseSnapShot;
import com.ctrip.apollo.biz.entity.Version;
import com.ctrip.apollo.biz.repository.ReleaseSnapShotRepository;
import com.ctrip.apollo.biz.repository.VersionRepository;
import com.ctrip.apollo.core.model.ApolloConfig;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Maps;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.IOException;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RunWith(MockitoJUnitRunner.class)
public class ConfigServiceImplTest {
    @Mock
    private VersionRepository versionRepository;
    @Mock
    private ReleaseSnapShotRepository releaseSnapShotRepository;
    @Mock
    private ObjectMapper objectMapper;
    private ConfigServiceImpl configService;

    @Before
    public void setUp() throws Exception {
        configService = new ConfigServiceImpl();
        ReflectionTestUtils.setField(configService, "versionRepository", versionRepository);
        ReflectionTestUtils.setField(configService, "releaseSnapShotRepository", releaseSnapShotRepository);
        ReflectionTestUtils.setField(configService, "objectMapper", objectMapper);
    }

    @Test
    public void testLoadConfig() throws Exception {
        long someAppId = 1;
        String someClusterName = "someClusterName";
        String someVersionName = "someVersionName";
        long someReleaseId = 1;
        String someValidConfiguration = "{\"apollo.bar\": \"foo\"}";

        Version someVersion = assembleVersion(someAppId, someVersionName, someReleaseId);
        ReleaseSnapShot someReleaseSnapShot = assembleReleaseSnapShot(someReleaseId, someClusterName, someValidConfiguration);
        Map<String, Object> someMap = Maps.newHashMap();

        when(versionRepository.findByAppIdAndName(someAppId, someVersionName)).thenReturn(someVersion);
        when(releaseSnapShotRepository.findByReleaseIdAndClusterName(someReleaseId, someClusterName)).thenReturn(someReleaseSnapShot);
        when(objectMapper.readValue(eq(someValidConfiguration), (TypeReference) anyObject())).thenReturn(someMap);

        ApolloConfig result = configService.loadConfig(someAppId, someClusterName, someVersionName);

        assertEquals(someAppId, result.getAppId());
        assertEquals(someClusterName, result.getCluster());
        assertEquals(someVersionName, result.getVersion());
        assertEquals(someReleaseId, result.getReleaseId());
        assertEquals(someMap, result.getConfigurations());

    }

    private Version assembleVersion(long appId, String versionName, long releaseId) {
        Version version = new Version();
        version.setAppId(appId);
        version.setName(versionName);
        version.setReleaseId(releaseId);
        return version;
    }

    private ReleaseSnapShot assembleReleaseSnapShot(long releaseId, String clusterName, String configurations) {
        ReleaseSnapShot releaseSnapShot = new ReleaseSnapShot();
        releaseSnapShot.setReleaseId(releaseId);
        releaseSnapShot.setClusterName(clusterName);
        releaseSnapShot.setConfigurations(configurations);
        return releaseSnapShot;
    }


    @Test
    public void testTransformConfigurationToMapSuccessful() throws Exception {
        String someValidConfiguration = "{\"apollo.bar\": \"foo\"}";
        Map<String, String> someMap = Maps.newHashMap();
        when(objectMapper.readValue(eq(someValidConfiguration), (TypeReference) anyObject())).thenReturn(someMap);

        Map<String, Object> result = configService.transformConfigurationToMap(someValidConfiguration);

        assertEquals(someMap, result);
        verify(objectMapper, times(1)).readValue(eq(someValidConfiguration), (TypeReference) anyObject());
    }

    @Test
    public void testTransformConfigurationToMapFailed() throws Exception {
        String someInvalidConfiguration = "xxx";
        when(objectMapper.readValue(eq(someInvalidConfiguration), (TypeReference) anyObject())).thenThrow(IOException.class);

        Map<String, Object> result = configService.transformConfigurationToMap(someInvalidConfiguration);

        assertTrue(result.isEmpty());

    }
}
