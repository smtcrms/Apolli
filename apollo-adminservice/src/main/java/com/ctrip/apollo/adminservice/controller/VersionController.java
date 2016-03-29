package com.ctrip.apollo.adminservice.controller;

import com.ctrip.apollo.biz.service.AdminReleaseService;
import com.ctrip.apollo.core.dto.VersionDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/version")
public class VersionController {

  @Autowired
  private AdminReleaseService adminReleaseService;

  @RequestMapping("/app/{appId}")
  public List<VersionDTO> versions(@PathVariable String appId) {
    return adminReleaseService.findVersionsByApp(appId);
  }

  @RequestMapping("/{versionId}")
  public VersionDTO version(@PathVariable long versionId) {
    return adminReleaseService.loadVersionById(versionId);
  }
}
