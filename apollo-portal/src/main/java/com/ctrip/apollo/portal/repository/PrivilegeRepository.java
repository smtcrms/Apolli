package com.ctrip.apollo.portal.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.ctrip.apollo.portal.entity.Privilege;

public interface PrivilegeRepository extends PagingAndSortingRepository<Privilege, Long> {

  List<Privilege> findByAppId(String appId);

  List<Privilege> findByAppIdAndPrivilType(String appId, String privilType);

  Privilege findByAppIdAndNameAndPrivilType(String appId, String name, String privilType);
}
