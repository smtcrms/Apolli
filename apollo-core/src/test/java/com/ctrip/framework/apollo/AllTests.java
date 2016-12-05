package com.ctrip.framework.apollo;

import com.ctrip.framework.apollo.core.MetaDomainTest;
import com.ctrip.framework.apollo.core.utils.ServiceBootstrapTest;
import com.ctrip.framework.apollo.tracer.TracerTest;
import com.ctrip.framework.apollo.tracer.internals.DefaultMessageProducerManagerTest;
import com.ctrip.framework.apollo.tracer.internals.NullMessageProducerManagerTest;
import com.ctrip.framework.apollo.tracer.internals.NullMessageProducerTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    MetaDomainTest.class, ServiceBootstrapTest.class, NullMessageProducerManagerTest.class,
    NullMessageProducerTest.class, DefaultMessageProducerManagerTest.class, TracerTest.class})
public class AllTests {

}
