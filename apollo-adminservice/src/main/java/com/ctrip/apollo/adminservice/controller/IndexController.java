package com.ctrip.apollo.adminservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/")
public class IndexController {

  @RequestMapping(path = "")
  public String index() {
    return "apollo-adminservice";
  }
}
