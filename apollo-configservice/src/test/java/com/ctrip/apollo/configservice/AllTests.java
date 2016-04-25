package com.ctrip.apollo.configservice;

import com.ctrip.apollo.configservice.controller.ConfigControllerTest;
import com.ctrip.apollo.configservice.controller.NotificationControllerTest;
import com.ctrip.apollo.configservice.integration.ConfigControllerIntegrationTest;
import com.ctrip.apollo.configservice.integration.NotificationControllerIntegrationTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ConfigControllerTest.class, NotificationControllerTest.class,
    ConfigControllerIntegrationTest.class, NotificationControllerIntegrationTest.class})
public class AllTests {

}
