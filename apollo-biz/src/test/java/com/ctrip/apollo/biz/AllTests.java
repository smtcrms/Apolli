package com.ctrip.apollo.biz;

import com.ctrip.apollo.biz.repository.AppRepositoryTest;
import com.ctrip.apollo.biz.service.AdminServiceTest;
import com.ctrip.apollo.biz.service.AdminServiceTransactionTest;
import com.ctrip.apollo.biz.service.ConfigServiceTest;
import com.ctrip.apollo.biz.service.PrivilegeServiceTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    AppRepositoryTest.class,
    AdminServiceTest.class,
    ConfigServiceTest.class,
    PrivilegeServiceTest.class,
    AdminServiceTransactionTest.class})
public class AllTests {

}
