package com.ctrip.apollo.metaserver;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
@EnableEurekaClient
public class MetaServerApplication {

  public static void main(String[] args) {
    new SpringApplicationBuilder(MetaServerApplication.class).web(true).run(args);
  }
}
