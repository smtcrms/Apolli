package com.ctrip.framework.apollo.biz;

import com.ctrip.framework.apollo.biz.eureka.ApolloEurekaClientConfigTest;
import com.ctrip.framework.apollo.biz.message.DatabaseMessageSenderTest;
import com.ctrip.framework.apollo.biz.message.ReleaseMessageScannerTest;
import com.ctrip.framework.apollo.biz.repository.AppNamespaceRepositoryTest;
import com.ctrip.framework.apollo.biz.repository.AppRepositoryTest;
import com.ctrip.framework.apollo.biz.service.AdminServiceTest;
import com.ctrip.framework.apollo.biz.service.AdminServiceTransactionTest;
import com.ctrip.framework.apollo.biz.service.ClusterServiceTest;
import com.ctrip.framework.apollo.biz.service.InstanceServiceTest;
import com.ctrip.framework.apollo.biz.service.PrivilegeServiceTest;
import com.ctrip.framework.apollo.biz.service.ReleaseServiceTest;
import com.ctrip.framework.apollo.biz.service.ServerConfigServiceTest;
import com.ctrip.framework.apollo.biz.utils.ReleaseKeyGeneratorTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    AppRepositoryTest.class,
    AppNamespaceRepositoryTest.class,
    AdminServiceTest.class,
    PrivilegeServiceTest.class,
    AdminServiceTransactionTest.class,
    DatabaseMessageSenderTest.class,
    ServerConfigServiceTest.class,
    ApolloEurekaClientConfigTest.class,
    ReleaseServiceTest.class,
    ReleaseMessageScannerTest.class,
    ClusterServiceTest.class,
    ReleaseKeyGeneratorTest.class,
    InstanceServiceTest.class
})
public class AllTests {

}
