package com.ctrip.apollo.portal.repository;

import com.ctrip.apollo.portal.entity.Privilege;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PrivilegeRepository extends PagingAndSortingRepository<Privilege, Long> {

  List<Privilege> findByAppId(long appId);

  List<Privilege> findByAppIdAndPrivilType(long appId, String privilType);

  Privilege findByAppIdAndNameAndPrivilType(long appId, String name, String privilType);
}
