package com.ctrip.apollo.biz.datasource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TitanSettings {

  @Value("${titan.url:}")
  private String titanUrl;

  @Value("${titan.dbname:}")
  private String titanDbname;

  public String getTitanUrl() {
    return titanUrl;
  }

  public void setTitanUrl(String titanUrl) {
    this.titanUrl = titanUrl;
  }

  public String getTitanDbname() {
    return titanDbname;
  }

  public void setTitanDbname(String titanDbname) {
    this.titanDbname = titanDbname;
  }
}
