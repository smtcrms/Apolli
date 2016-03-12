package com.ctrip.apollo.portal.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ctrip.apollo.portal.domain.App;
import com.ctrip.apollo.portal.service.AppService;

@RestController
@RequestMapping("/apps")
public class AppController {

  @Autowired
  private AppService appService;

  @RequestMapping(value = "", method = RequestMethod.POST)
  public App create(App app) {
    return appService.save(app);
  }

  @RequestMapping("/{appid}")
  public App detail(@PathVariable String appId) {
    return appService.detail(appId);
  }

  @RequestMapping("")
  public Page<App> list(@PageableDefault(size = 50) Pageable pageable) {
    return appService.list(pageable);
  }
}
