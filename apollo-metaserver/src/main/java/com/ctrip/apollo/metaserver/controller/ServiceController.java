package com.ctrip.apollo.metaserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctrip.apollo.metaserver.service.DiscoveryService;
import com.netflix.appinfo.InstanceInfo;

@RestController
@RequestMapping("/services")
public class ServiceController {

  @Autowired
  private DiscoveryService discoveryService;


  @RequestMapping("/meta")
  public List<InstanceInfo> metaServer() {
    return discoveryService.getMetaServerServiceInstance();
  }

  @RequestMapping("/config")
  public List<InstanceInfo> configServer() {
    return discoveryService.getConfigServerServiceInstance();
  }
}
