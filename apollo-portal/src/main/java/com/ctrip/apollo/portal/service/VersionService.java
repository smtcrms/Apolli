package com.ctrip.apollo.portal.service;

import com.ctrip.apollo.Apollo;
import com.ctrip.apollo.core.dto.VersionDTO;
import com.ctrip.apollo.portal.RestUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VersionService {

  @Autowired
  private ServiceLocator serviceLocator;


  public List<VersionDTO> findVersionsByApp(Apollo.Env env, long appId) {
    return RestUtils
        .exchangeInGET(serviceLocator.getAdminService(env) + "/version/app/" + appId, List.class);
  }
}
