package com.ctrip.apollo.metaserver.service;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.ctrip.apollo.metaserver.AbstractMetaServerTest;
import com.netflix.appinfo.InstanceInfo;

public class DiscoveryServiceTest extends AbstractMetaServerTest {

  @Autowired
  private DiscoveryService discoveryService;

  @Test
  public void testGetLocalMetaServerServices() {
    List<InstanceInfo> instances = discoveryService.getMetaServerServiceInstance();
    System.out.println(instances);
  }
}
