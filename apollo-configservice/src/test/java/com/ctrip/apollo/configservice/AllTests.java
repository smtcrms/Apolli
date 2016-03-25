package com.ctrip.apollo.configservice;

import com.ctrip.apollo.configservice.controller.ConfigControllerTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    ConfigControllerTest.class
})
public class AllTests {

}
