package com.ctrip.apollo.configserver;

import java.io.IOException;

import org.apache.curator.test.TestingServer;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ConfigServerApplicationTestConfiguration.class)
public abstract class AbstractConfigServerTest {

  private static TestingServer zkTestServer;

  @BeforeClass
  public static void beforeClass() throws Exception {
    zkTestServer = new TestingServer(2181, false);
    zkTestServer.start();
    System.out.format("embedded zookeeper is up %s%n", zkTestServer.getConnectString());
  }

  @AfterClass
  public static void afterClass() throws IOException {
    if (zkTestServer != null) {
      zkTestServer.close();
    }
  }
}
