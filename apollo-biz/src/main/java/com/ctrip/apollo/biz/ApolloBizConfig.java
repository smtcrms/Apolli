package com.ctrip.apollo.biz;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@EnableAutoConfiguration
@Configuration
@ComponentScan(basePackageClasses = com.ctrip.apollo.biz.ApolloBizConfig.class)
public class ApolloBizConfig {

}
