package com.ctrip.apollo.portal.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class App implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 7348554309210401557L;

  @Id
  private String id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String owner;

  @Column
  private String ownerPhone;

  @Column
  private String ownerMail;

  @Column
  private Date createTimestamp;

  @Column
  private Date lastUpdatedTimestamp;
}
