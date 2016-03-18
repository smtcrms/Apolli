package com.ctrip.apollo.metaserver.controller;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.web.client.RestTemplate;

import com.ctrip.apollo.core.ServiceIdConsts;
import com.ctrip.apollo.metaserver.AbstractMetaServerTest;
import com.netflix.appinfo.InstanceInfo;


@WebIntegrationTest
public class DiscoveryControllerTest extends AbstractMetaServerTest {

  RestTemplate restTemplate = new TestRestTemplate();

  @Value("${local.server.port}")
  String serverPort;

  @Test
  public void testGetMetaServerServices() throws InterruptedException, URISyntaxException {
    // Wait Eureka Client to fresh meta
    Thread.sleep(5000);

    URI uri = new URI("http://localhost:" + serverPort + "/services/meta");
    InstanceInfo[] serviceInstances = restTemplate.getForObject(uri, InstanceInfo[].class);
    Assert.assertEquals(1, serviceInstances.length);
    Assert.assertEquals(ServiceIdConsts.APOLLO_METASERVER,
        serviceInstances[0].getAppName().toLowerCase());
  }
}
