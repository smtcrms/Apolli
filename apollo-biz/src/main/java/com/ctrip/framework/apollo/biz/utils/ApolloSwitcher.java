package com.ctrip.framework.apollo.biz.utils;

import com.ctrip.framework.apollo.biz.service.ServerConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ApolloSwitcher {

  private static final String NAMESPACE_LOCK_SWITCH_CONFIG_KEY = "namespace.lock.switch";

  @Autowired
  private ServerConfigService serverConfigService;


  public boolean isNamespaceLockSwitchOff() {
    return !"true".equals(serverConfigService.getValue(NAMESPACE_LOCK_SWITCH_CONFIG_KEY, "false"));
  }

}
