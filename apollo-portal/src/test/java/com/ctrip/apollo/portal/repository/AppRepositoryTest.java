package com.ctrip.apollo.portal.repository;

import java.util.Date;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ctrip.apollo.portal.PortalApplicationTestConfiguration;
import com.ctrip.apollo.portal.entities.App;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = PortalApplicationTestConfiguration.class)
public class AppRepositoryTest {

  @Autowired
  AppRepository repository;

  @Test
  public void testCreate() {
    Assert.assertEquals(0, repository.count());

    App ramdomApp = new App();
    ramdomApp.setId(String.valueOf(System.currentTimeMillis()));
    ramdomApp.setName("new app " + System.currentTimeMillis());
    ramdomApp.setOwner("owner " + System.currentTimeMillis());
    ramdomApp.setCreateTimestamp(new Date());
    repository.save(ramdomApp);

    Assert.assertEquals(1, repository.count());
  }
}
