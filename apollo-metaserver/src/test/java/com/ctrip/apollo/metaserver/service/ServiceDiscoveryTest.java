package com.ctrip.apollo.metaserver.service;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;

import com.ctrip.apollo.metaserver.AbstractMetaServerTest;

public class ServiceDiscoveryTest extends AbstractMetaServerTest {

  @Autowired
  private DiscoveryService discoveryService;

  @Test
  public void testGetLocalMetaServerServices() {
    List<ServiceInstance> instances = discoveryService.getMetaServerServiceInstances();
    System.out.println(instances);
  }
}
