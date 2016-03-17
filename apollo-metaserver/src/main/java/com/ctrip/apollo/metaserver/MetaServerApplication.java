package com.ctrip.apollo.metaserver;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.ConfigurableApplicationContext;

import com.ctrip.apollo.metaserver.service.DiscoveryService;
import com.netflix.appinfo.InstanceInfo;

@SpringBootApplication
@EnableEurekaServer
@EnableEurekaClient
public class MetaServerApplication {

  public static void main(String[] args) {
    ConfigurableApplicationContext context =
        new SpringApplicationBuilder(MetaServerApplication.class).web(true).run(args);
    DiscoveryService discoveryService = context.getBean(DiscoveryService.class);
    List<InstanceInfo> instances = discoveryService.getMetaServerServiceInstance();
    System.out.println(instances);
  }
}
