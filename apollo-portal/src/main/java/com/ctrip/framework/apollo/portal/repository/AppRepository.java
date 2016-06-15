package com.ctrip.framework.apollo.portal.repository;

import com.ctrip.framework.apollo.common.entity.App;

import org.springframework.data.repository.PagingAndSortingRepository;


public interface AppRepository extends PagingAndSortingRepository<App, Long> {

  App findByAppId(String appId);

}
