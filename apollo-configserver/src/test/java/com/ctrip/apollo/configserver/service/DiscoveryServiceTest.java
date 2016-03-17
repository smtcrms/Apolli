package com.ctrip.apollo.configserver.service;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;

import com.ctrip.apollo.configserver.AbstractConfigServerTest;

public class DiscoveryServiceTest extends AbstractConfigServerTest {

  @Autowired
  private DiscoveryService discoveryService;

  @Test
  public void testGetLocalMetaServerServices() {
    List<ServiceInstance> instances = discoveryService.getMetaServerServiceInstances();
    System.out.println(instances);
  }
}
