package com.ctrip.apollo.metaserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctrip.apollo.core.ServiceIdConsts;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;
import com.netflix.discovery.shared.Application;

@Service
public class DiscoveryService {

  @Autowired
  private EurekaClient eurekaClient;

  public List<InstanceInfo> getConfigServerServiceInstance() {
    Application application = eurekaClient.getApplication(ServiceIdConsts.APOLLO_CONFIGSERVER);
    return application.getInstances();
  }

  public List<InstanceInfo> getMetaServerServiceInstance() {
    Application application = eurekaClient.getApplication(ServiceIdConsts.APOLLO_METASERVER);
    return application.getInstances();
  }

}
