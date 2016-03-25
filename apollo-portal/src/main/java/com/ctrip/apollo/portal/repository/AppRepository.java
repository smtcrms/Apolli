package com.ctrip.apollo.portal.repository;

import com.ctrip.apollo.portal.entity.App;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AppRepository extends PagingAndSortingRepository<App, String> {

  Page<App> findAll(Pageable pageable);

  App findByAppId(long appId);
}
