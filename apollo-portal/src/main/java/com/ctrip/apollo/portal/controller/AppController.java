package com.ctrip.apollo.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
  public Page<App> list() {
    Pageable pageable = new PageRequest(0, 10);
    return appRepository.findAll(pageable);
  }

  @RequestMapping(value = "", method = RequestMethod.POST)
  public App create() {
    App ramdomApp = new App();
    return appRepository.save(ramdomApp);
  }
}
