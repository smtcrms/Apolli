package com.ctrip.apollo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EurekaClientAutoConfiguration;

@SpringBootApplication(exclude = {SampleAdminServiceApplication.class,
    EurekaClientAutoConfiguration.class})
public class AdminServiceTestConfiguration {

}
