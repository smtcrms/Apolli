package com.ctrip.apollo.portal.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.ctrip.apollo.portal.entity.Privilege;

public interface PrivilegeRepository extends PagingAndSortingRepository<Privilege, Long> {

  List<Privilege> findByAppId(String appId);

  Privilege findByAppIdAndPrivilType(String appId, String privilType);
}
