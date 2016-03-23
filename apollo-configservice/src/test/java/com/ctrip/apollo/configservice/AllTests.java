package com.ctrip.apollo.configservice;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.ctrip.apollo.configservice.controller.ConfigControllerTest;

@RunWith(Suite.class)
@SuiteClasses({
ConfigControllerTest.class
})
public class AllTests {

}
