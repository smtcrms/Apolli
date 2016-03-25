package com.ctrip.apollo.client;

import com.ctrip.apollo.client.loader.ConfigLoaderManager;
import com.ctrip.apollo.client.model.PropertyChange;
import com.ctrip.apollo.client.model.PropertySourceReloadResult;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.cloud.context.scope.refresh.RefreshScope;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.CompositePropertySource;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
@RunWith(MockitoJUnitRunner.class)
public class ApolloConfigManagerTest {
  private ApolloConfigManager apolloConfigManager;
  @Mock
  private ConfigLoaderManager configLoaderManager;
  @Mock
  private ConfigurableApplicationContext applicationContext;
  @Mock
  private ConfigurableEnvironment env;
  @Mock
  private MutablePropertySources mutablePropertySources;
  @Mock
  private BeanDefinitionRegistry beanDefinitionRegistry;
  @Mock
  private RefreshScope scope;

  @Before
  public void setUp() {
    apolloConfigManager = spy(new ApolloConfigManager());

    when(applicationContext.getEnvironment()).thenReturn(env);
    when(env.getPropertySources()).thenReturn(mutablePropertySources);

    apolloConfigManager.setApplicationContext(applicationContext);
    ReflectionTestUtils.setField(apolloConfigManager, "configLoaderManager", configLoaderManager);
    ReflectionTestUtils.setField(apolloConfigManager, "scope", scope);
  }

  @After
  public void tearDown() throws Exception {
    AtomicReference<ApolloConfigManager> singletonProtector =
        (AtomicReference<ApolloConfigManager>) ReflectionTestUtils
            .getField(ApolloConfigManager.class, "singletonProtector");
    singletonProtector.set(null);
  }

  @Test(expected = RuntimeException.class)
  public void testInvalidApplicationContext() {
    ApplicationContext someInvalidApplication = mock(ApplicationContext.class);
    apolloConfigManager.setApplicationContext(someInvalidApplication);
  }

  @Test
  public void testInitializePropertySourceSuccessfully() {
    CompositePropertySource somePropertySource = mock(CompositePropertySource.class);
    final ArgumentCaptor<CompositePropertySource>
        captor =
        ArgumentCaptor.forClass(CompositePropertySource.class);

    when(configLoaderManager.loadPropertySource()).thenReturn(somePropertySource);

    apolloConfigManager.initializePropertySource();

    verify(configLoaderManager, times(1)).loadPropertySource();
    verify(mutablePropertySources, times(1)).addFirst(captor.capture());

    final CompositePropertySource insertedPropertySource = captor.getValue();

    assertEquals(insertedPropertySource, somePropertySource);
  }

  @Test
  public void testPostProcessBeanDefinitionRegistry() {
    doNothing().when(apolloConfigManager).initializePropertySource();

    apolloConfigManager.postProcessBeanDefinitionRegistry(beanDefinitionRegistry);

    verify(beanDefinitionRegistry, times(2))
        .registerBeanDefinition(anyString(), any(BeanDefinition.class));
  }

  @Test
  public void testUpdatePropertySourceWithChanges() throws Exception {
    PropertySourceReloadResult
        somePropertySourceReloadResult =
        mock(PropertySourceReloadResult.class);
    CompositePropertySource somePropertySource = mock(CompositePropertySource.class);
    List<PropertyChange> someChanges = mock(List.class);

    when(somePropertySourceReloadResult.hasChanges()).thenReturn(true);
    when(somePropertySourceReloadResult.getPropertySource()).thenReturn(somePropertySource);
    when(somePropertySourceReloadResult.getChanges()).thenReturn(someChanges);
    when(configLoaderManager.reloadPropertySource()).thenReturn(somePropertySourceReloadResult);

    List<PropertyChange> result = apolloConfigManager.updatePropertySource();

    assertEquals(someChanges, result);
    verify(scope, times(1)).refreshAll();
  }

  @Test
  public void testUpdatePropertySourceWithNoChange() throws Exception {
    PropertySourceReloadResult
        somePropertySourceReloadResult =
        mock(PropertySourceReloadResult.class);
    CompositePropertySource somePropertySource = mock(CompositePropertySource.class);
    List<PropertyChange> emptyChanges = Collections.emptyList();

    when(somePropertySourceReloadResult.hasChanges()).thenReturn(false);
    when(somePropertySourceReloadResult.getPropertySource()).thenReturn(somePropertySource);
    when(somePropertySourceReloadResult.getChanges()).thenReturn(emptyChanges);
    when(configLoaderManager.reloadPropertySource()).thenReturn(somePropertySourceReloadResult);

    List<PropertyChange> result = apolloConfigManager.updatePropertySource();

    assertEquals(emptyChanges, result);
    verify(scope, never()).refreshAll();

  }
}
