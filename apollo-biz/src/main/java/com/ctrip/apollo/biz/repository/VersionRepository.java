package com.ctrip.apollo.biz.repository;

import com.ctrip.apollo.biz.entity.Version;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Jason Song(song_s@ctrip.com)
 */
public interface VersionRepository extends PagingAndSortingRepository<Version, Long> {
    Version findByAppIdAndName(long appId, String name);
}
