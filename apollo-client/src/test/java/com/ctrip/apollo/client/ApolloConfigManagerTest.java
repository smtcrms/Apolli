package com.ctrip.apollo.client;

import com.ctrip.apollo.client.loader.ConfigLoader;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.CompositePropertySource;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.concurrent.atomic.AtomicReference;

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
    @Mock
    private BeanDefinitionRegistry beanDefinitionRegistry;

    @Before
    public void setUp() {
        apolloConfigManager = spy(new ApolloConfigManager());

        when(applicationContext.getEnvironment()).thenReturn(env);
        when(env.getPropertySources()).thenReturn(mutablePropertySources);

        apolloConfigManager.setApplicationContext(applicationContext);
        ReflectionTestUtils.setField(apolloConfigManager, "configLoader", configLoader);
    }

    @After
    public void tearDown() throws Exception {
        AtomicReference<ApolloConfigManager> singletonProtector =
            (AtomicReference<ApolloConfigManager>)ReflectionTestUtils.getField(ApolloConfigManager.class, "singletonProtector");
        singletonProtector.set(null);
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

        apolloConfigManager.initializePropertySource();

        verify(configLoader, times(1)).loadPropertySource();
        verify(mutablePropertySources, times(1)).addFirst(captor.capture());

        final CompositePropertySource insertedPropertySource = captor.getValue();

        assertEquals(ApolloConfigManager.APOLLO_PROPERTY_SOURCE_NAME, insertedPropertySource.getName());
        assertTrue(insertedPropertySource.getPropertySources().contains(somePropertySource));
    }

    @Test
    public void testPostProcessBeanDefinitionRegistry() {
        doNothing().when(apolloConfigManager).initializePropertySource();

        apolloConfigManager.postProcessBeanDefinitionRegistry(beanDefinitionRegistry);

        verify(beanDefinitionRegistry, times(2)).registerBeanDefinition(anyString(), any(BeanDefinition.class));
    }

}
