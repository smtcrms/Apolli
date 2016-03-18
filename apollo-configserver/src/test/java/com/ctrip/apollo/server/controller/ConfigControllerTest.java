package com.ctrip.apollo.server.controller;

import com.ctrip.apollo.biz.service.ConfigService;
import com.ctrip.apollo.core.model.ApolloConfig;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RunWith(MockitoJUnitRunner.class)
public class ConfigControllerTest {
    private ConfigController configController;
    @Mock
    private ConfigService configService;

    @Before
    public void setUp() throws Exception {
        configController = new ConfigController();
        ReflectionTestUtils.setField(configController, "configService", configService);
    }

    @Test
    public void testQueryConfig() throws Exception {
        ApolloConfig someApolloConfig = mock(ApolloConfig.class);
        long someAppId = 1;
        String someClusterName = "someClusterName";
        String someVersion = "someVersion";

        when(configService.loadConfig(someAppId, someClusterName, someVersion)).thenReturn(someApolloConfig);

        ApolloConfig result = configController.queryConfig(someAppId, someClusterName, someVersion);

        assertEquals(someApolloConfig, result);
        verify(configService, times(1)).loadConfig(someAppId, someClusterName, someVersion);

    }
}
