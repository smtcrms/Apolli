package com.ctrip.framework.apollo.common;

import com.ctrip.framework.apollo.common.utils.DataSourceValidatorTest;
import com.ctrip.framework.apollo.common.utils.InputValidatorTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    InputValidatorTest.class, DataSourceValidatorTest.class
})
public class AllTests {

}
