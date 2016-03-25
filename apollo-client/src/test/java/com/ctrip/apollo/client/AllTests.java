package com.ctrip.apollo.client;

import com.ctrip.apollo.client.loader.ConfigLoaderManagerTest;
import com.ctrip.apollo.client.loader.impl.RemoteConfigLoaderTest;
import com.ctrip.apollo.client.util.ConfigUtilTest;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
    ApolloConfigManagerTest.class, ConfigLoaderManagerTest.class, RemoteConfigLoaderTest.class,
    ConfigUtilTest.class
})
public class AllTests {

}
