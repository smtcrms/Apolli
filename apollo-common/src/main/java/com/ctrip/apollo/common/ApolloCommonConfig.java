package com.ctrip.apollo.common;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@EnableAutoConfiguration
@Configuration
@ComponentScan(basePackageClasses = com.ctrip.apollo.common.ApolloCommonConfig.class)
public class ApolloCommonConfig {

}
