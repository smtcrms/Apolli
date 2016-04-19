package com.ctrip.apollo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class SamplePortalApplication {
  public static void main(String[] args) {
    new SpringApplicationBuilder(SamplePortalApplication.class).run(args);
  }
}
