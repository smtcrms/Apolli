package com.ctrip.apollo.client;

import com.ctrip.apollo.client.loader.ConfigLoader;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.CompositePropertySource;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RunWith(MockitoJUnitRunner.class)
public class ApolloConfigManagerTest {
    private ApolloConfigManager apolloConfigManager;
    @Mock
    private ConfigLoader configLoader;
    @Mock
    private ConfigurableApplicationContext applicationContext;
    @Mock
    private ConfigurableEnvironment env;
    @Mock
    private MutablePropertySources mutablePropertySources;

    @Before
    public void setUp() {
        apolloConfigManager = new ApolloConfigManager();

        when(applicationContext.getEnvironment()).thenReturn(env);
        when(env.getPropertySources()).thenReturn(mutablePropertySources);

        apolloConfigManager.setApplicationContext(applicationContext);
        ReflectionTestUtils.setField(apolloConfigManager, "configLoader", configLoader);
    }

    @Test(expected = RuntimeException.class)
    public void testInvalidApplicationContext() {
        ApplicationContext someInvalidApplication = mock(ApplicationContext.class);
        apolloConfigManager.setApplicationContext(someInvalidApplication);
    }

    @Test
    public void testPreparePropertySourceSuccessfully() {
        CompositePropertySource somePropertySource = mock(CompositePropertySource.class);
        final ArgumentCaptor<CompositePropertySource> captor = ArgumentCaptor.forClass(CompositePropertySource.class);

        when(configLoader.loadPropertySource()).thenReturn(somePropertySource);

        apolloConfigManager.preparePropertySource();

        verify(configLoader, times(1)).loadPropertySource();
        verify(mutablePropertySources, times(1)).addFirst(captor.capture());

        final CompositePropertySource insertedPropertySource = captor.getValue();

        assertEquals(ApolloConfigManager.APOLLO_PROPERTY_SOURCE_NAME, insertedPropertySource.getName());
        assertTrue(insertedPropertySource.getPropertySources().contains(somePropertySource));
    }

}
