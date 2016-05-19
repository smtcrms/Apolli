package com.ctrip.framework.apollo.portal.service.txtresolver;

import com.ctrip.framework.apollo.core.dto.ItemChangeSets;
import com.ctrip.framework.apollo.core.dto.ItemDTO;

import java.util.List;

/**
 * users can modify config in text mode.so need updateConfigItemByText text.
 */
public interface ConfigTextResolver {

  ItemChangeSets resolve(long namespaceId, String configText, List<ItemDTO> baseItems);

}
