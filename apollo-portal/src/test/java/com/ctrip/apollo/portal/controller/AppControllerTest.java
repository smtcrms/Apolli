package com.ctrip.apollo.portal.controller;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.ctrip.apollo.portal.AbstractPortalTest;
import com.ctrip.apollo.portal.entity.App;
import com.ctrip.apollo.portal.repository.AppRepository;


@WebIntegrationTest
public class AppControllerTest extends AbstractPortalTest {

  RestTemplate restTemplate = new TestRestTemplate();

  @Autowired
  AppRepository appRepository;

  @Test
  public void testCreate() throws URISyntaxException {
    App newApp = new App();
    newApp.setAppId(String.valueOf(System.currentTimeMillis()));
    newApp.setName("new app " + System.currentTimeMillis());
    newApp.setOwner("owner " + System.currentTimeMillis());

    URI uri = new URI("http://localhost:8080/apps");
    App createdApp = restTemplate.postForObject(uri, newApp, App.class);

    Assert.assertEquals(newApp.getAppId(), createdApp.getAppId());
    Assert.assertNull(newApp.getCreateTimestamp());
    Assert.assertNotNull(createdApp.getCreateTimestamp());

    App foundApp = appRepository.findOne(newApp.getAppId());

    Assert.assertEquals(newApp.getAppId(), foundApp.getAppId());
  }

  @Test
  public void testList() throws URISyntaxException {
    App newApp = new App();
    newApp.setAppId(String.valueOf(System.currentTimeMillis()));
    newApp.setName("new app " + System.currentTimeMillis());
    newApp.setOwner("owner " + System.currentTimeMillis());
    appRepository.save(newApp);

    URI uri = new URI("http://localhost:8080/apps");

    App[] apps = restTemplate.getForObject(uri, App[].class);
    Assert.assertEquals(1, apps.length);
    Assert.assertEquals(newApp.getAppId(), apps[0].getAppId());
  }

  @Test
  public void testListOutOfRange() throws URISyntaxException {
    App newApp = new App();
    newApp.setAppId(String.valueOf(System.currentTimeMillis()));
    newApp.setName("new app " + System.currentTimeMillis());
    newApp.setOwner("owner " + System.currentTimeMillis());
    appRepository.save(newApp);

    URI uri = new URI("http://localhost:8080/apps?page=2");

    ResponseEntity<App[]> entity = restTemplate.getForEntity(uri, App[].class);
    Assert.assertEquals(HttpStatus.NOT_FOUND, entity.getStatusCode());
    Assert.assertNull(entity.getBody());
  }
}
