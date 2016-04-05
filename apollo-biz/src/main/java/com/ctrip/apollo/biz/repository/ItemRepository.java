package com.ctrip.apollo.biz.repository;

import com.ctrip.apollo.biz.entity.Item;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

  List<Item> findByGroupIdIsIn(List<Long> groupIds);

  List<Item> findByGroupId(Long groupId);

}
