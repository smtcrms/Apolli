package com.ctrip.apollo.portal.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class SampleController {

  @RequestMapping("")
  public String home() {
    return "Hello World!";
  }
}
