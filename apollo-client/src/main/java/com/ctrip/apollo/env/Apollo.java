package com.ctrip.apollo.env;

import com.google.common.base.Strings;

import com.ctrip.apollo.core.enums.Env;
import com.ctrip.framework.foundation.Foundation;

public class Apollo {
  private static Env s_env;
  private static String s_appId;
  private static String s_cluster;

  static {
    setEnv(Foundation.server().getEnvType());

    s_appId = Foundation.app().getAppId();

    s_cluster = System.getProperty("apollo.cluster");
  }

  public static String getAppId() {
    return s_appId;
  }

  public static Env getEnv() {
    return s_env;
  }

  public static String getCluster() {
    return s_cluster;
  }

  private static void setEnv(String envName) {
    if (Strings.isNullOrEmpty(envName)) {
      return;
    }
    switch (envName.toUpperCase()) {
      case "LPT":
        s_env = Env.LPT;
        break;
      case "FAT":
        s_env = Env.FAT;
        break;
      case "UAT":
        s_env = Env.UAT;
        break;
      case "PRO":
        s_env = Env.PRO;
        break;
      case "DEV":
        s_env = Env.DEV;
        break;
      case "LOCAL":
        s_env = Env.LOCAL;
        break;
      default:
        //do nothing
        break;
    }
  }

}
