package com.ctrip.apollo.portal;

import com.ctrip.apollo.portal.controller.AppControllerTest;
import com.ctrip.apollo.portal.repository.AppRepositoryTest;
import com.ctrip.apollo.portal.service.ConfigServiceTest;
import com.ctrip.apollo.portal.service.PrivilegeServiceTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({AppControllerTest.class, AppRepositoryTest.class, PrivilegeServiceTest.class,
    ConfigServiceTest.class
})
public class AllTests {

}
