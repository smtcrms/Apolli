package com.ctrip.apollo.portal;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.ctrip.apollo.portal.controller.AppControllerTest;
import com.ctrip.apollo.portal.repository.AppRepositoryTest;
import com.ctrip.apollo.portal.service.PrivilegeServiceTest;

@RunWith(Suite.class)
@SuiteClasses({AppControllerTest.class, AppRepositoryTest.class, PrivilegeServiceTest.class,

})
public class AllTests {

}
