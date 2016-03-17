package com.ctrip.apollo.configserver;

import com.jcraft.jsch.JSch;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
@EnableDiscoveryClient
public class ConfigServerApplication {

  public static void main(String[] args) {
    JSch.setConfig("StrictHostKeyChecking", "no");//for git server key
    SpringApplication.run(ConfigServerApplication.class, args);
  }

}
