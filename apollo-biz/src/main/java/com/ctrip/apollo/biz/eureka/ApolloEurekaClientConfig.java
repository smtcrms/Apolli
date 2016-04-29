package com.ctrip.apollo.biz.eureka;

import com.google.common.base.Splitter;
import com.google.common.base.Strings;

import com.ctrip.apollo.biz.entity.ServerConfig;
import com.ctrip.apollo.biz.repository.ServerConfigRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.eureka.EurekaClientConfigBean;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class ApolloEurekaClientConfig extends EurekaClientConfigBean {
  static final String EUREKA_URL_CONFIG = "eureka.service.url";
  private static final Splitter URL_SPLITTER = Splitter.on(",").omitEmptyStrings();

  @Autowired
  private ServerConfigRepository serverConfigRepository;

  @Autowired
  private Environment environment;

  /**
   * Assert only one zone: defaultZone, but multiple environments.
   */
  public List<String> getEurekaServerServiceUrls(String myZone) {
    //First check if there is any system property override
    if (!Strings.isNullOrEmpty(environment.getProperty(EUREKA_URL_CONFIG))) {
      return URL_SPLITTER.splitToList(environment.getProperty(EUREKA_URL_CONFIG));
    }

    //Second check if it is configured in database
    ServerConfig eurekaUrl = serverConfigRepository.findByKey(EUREKA_URL_CONFIG);

    if (!Objects.isNull(eurekaUrl) && !Strings.isNullOrEmpty(eurekaUrl.getValue())) {
      return URL_SPLITTER.splitToList(eurekaUrl.getValue());

    }

    //fallback to default
    return super.getEurekaServerServiceUrls(myZone);
  }

}
