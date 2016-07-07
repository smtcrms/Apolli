package com.ctrip.framework.apollo.configservice;

import com.ctrip.framework.apollo.configservice.controller.ConfigControllerTest;
import com.ctrip.framework.apollo.configservice.controller.NotificationControllerTest;
import com.ctrip.framework.apollo.configservice.integration.ConfigControllerIntegrationTest;
import com.ctrip.framework.apollo.configservice.integration.NotificationControllerIntegrationTest;
import com.ctrip.framework.apollo.configservice.util.NamespaceUtilTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ConfigControllerTest.class, NotificationControllerTest.class,
    ConfigControllerIntegrationTest.class, NotificationControllerIntegrationTest.class,
    NamespaceUtilTest.class})
public class AllTests {

}
