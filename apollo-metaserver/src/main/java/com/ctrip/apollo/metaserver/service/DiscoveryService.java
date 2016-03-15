package com.ctrip.apollo.metaserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Service;

import com.ctrip.apollo.core.ServiceIdConsts;

@Service
public class DiscoveryService {

  @Autowired
  private DiscoveryClient discoveryClient;

  public List<ServiceInstance> getConfigServerServiceInstances() {
    List<ServiceInstance> instances =
        discoveryClient.getInstances(ServiceIdConsts.APOLLO_CONFIGSERVER);
    return instances;
  }

  public List<ServiceInstance> getMetaServerServiceInstances() {
    List<ServiceInstance> instances =
        discoveryClient.getInstances(ServiceIdConsts.APOLLO_METASERVER);
    return instances;
  }
}
