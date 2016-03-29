package com.ctrip.apollo.portal.repository;

import com.ctrip.apollo.portal.AbstractPortalTest;
import com.ctrip.apollo.portal.entity.App;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class AppRepositoryTest extends AbstractPortalTest {

  @Autowired
  AppRepository repository;

  @Test
  public void testCreate() {
    Assert.assertEquals(0, repository.count());

    App ramdomApp = new App();
    ramdomApp.setAppId(String.valueOf(System.currentTimeMillis()));
    ramdomApp.setName("new app " + System.currentTimeMillis());
    ramdomApp.setOwner("owner " + System.currentTimeMillis());
    repository.save(ramdomApp);

    Assert.assertEquals(1, repository.count());
  }
}
