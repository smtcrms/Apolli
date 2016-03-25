package com.ctrip.apollo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;


@SpringBootApplication
//@EnableEurekaClient
public class AdminServiceApplication {
  public static void main(String[] args) {
    new SpringApplicationBuilder(AdminServiceApplication.class).web(true).run(args);
  }
}
