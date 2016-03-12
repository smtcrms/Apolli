package com.ctrip.apollo.portal.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ctrip.apollo.portal.entities.App;
import com.ctrip.apollo.portal.repository.AppRepository;

@RestController
@RequestMapping("/apps")
public class AppController {

  @Autowired
  private AppRepository appRepository;

  @RequestMapping("")
  public Page<App> list(@PageableDefault(size = 50) Pageable pageable) {
    return appRepository.findAll(pageable);
  }

  @RequestMapping(value = "", method = RequestMethod.POST)
  public App create() {
    App ramdomApp = new App();
    ramdomApp.setId(String.valueOf(System.currentTimeMillis()));
    ramdomApp.setName("new app " + System.currentTimeMillis());
    ramdomApp.setOwner("owner " + System.currentTimeMillis());
    ramdomApp.setCreateTimestamp(new Date());
    return appRepository.save(ramdomApp);
  }
}
