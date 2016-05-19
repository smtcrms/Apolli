package com.ctrip.framework.apollo.biz;

import com.ctrip.framework.apollo.biz.message.DatabaseMessageSenderTest;
import com.ctrip.framework.apollo.biz.repository.AppNamespaceRepositoryTest;
import com.ctrip.framework.apollo.biz.repository.AppRepositoryTest;
import com.ctrip.framework.apollo.biz.service.AdminServiceTest;
import com.ctrip.framework.apollo.biz.service.AdminServiceTransactionTest;
import com.ctrip.framework.apollo.biz.service.ConfigServiceTest;
import com.ctrip.framework.apollo.biz.service.PrivilegeServiceTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    AppRepositoryTest.class,
    AppNamespaceRepositoryTest.class,
    AdminServiceTest.class,
    ConfigServiceTest.class,
    PrivilegeServiceTest.class,
    AdminServiceTransactionTest.class,
    DatabaseMessageSenderTest.class})
public class AllTests {

}
