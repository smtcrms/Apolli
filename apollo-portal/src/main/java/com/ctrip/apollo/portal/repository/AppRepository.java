package com.ctrip.apollo.portal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.ctrip.apollo.portal.entities.App;

public interface AppRepository extends CrudRepository<App, String> {

  Page<App> findAll(Pageable pageable);
}
