package com.ctrip.apollo.metaserver;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;

import com.ctrip.apollo.metaserver.service.DiscoveryService;

@SpringBootApplication
@EnableDiscoveryClient
public class MetaServerApplication {

  public static void main(String[] args) {
    ApplicationContext context = SpringApplication.run(MetaServerApplication.class, args);
    List<ServiceInstance> metaServerServiceInstances =
        context.getBean(DiscoveryService.class).getMetaServerServiceInstances();
    System.out.println(metaServerServiceInstances);
  }
}
