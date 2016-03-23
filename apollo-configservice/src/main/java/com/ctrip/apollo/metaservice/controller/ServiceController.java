package com.ctrip.apollo.metaservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctrip.apollo.metaservice.service.DiscoveryService;
import com.netflix.appinfo.InstanceInfo;

@RestController
@RequestMapping("/services")
public class ServiceController {

  @Autowired
  private DiscoveryService discoveryService;


  @RequestMapping("/meta")
  public List<InstanceInfo> getMetaService() {
    return discoveryService.getMetaServiceInstances();
  }

  @RequestMapping("/config")
  public List<InstanceInfo> getConfigService() {
    return discoveryService.getConfigServiceInstances();
  }
  
  @RequestMapping("/admin")
  public List<InstanceInfo> getAdminService(){
    return discoveryService.getAdminServiceInstances();
  }
}
