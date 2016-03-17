package com.ctrip.apollo.server;

import com.jcraft.jsch.JSch;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {

  public static void main(String[] args) {
    JSch.setConfig("StrictHostKeyChecking", "no");//for git server key
    SpringApplication.run(ConfigServerApplication.class, args);
  }

}
