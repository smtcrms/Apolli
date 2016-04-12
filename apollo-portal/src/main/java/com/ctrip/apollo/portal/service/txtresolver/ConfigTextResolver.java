package com.ctrip.apollo.portal.service.txtresolver;

import com.ctrip.apollo.core.dto.ItemDTO;

import java.util.List;

/**
 * users can modify config in text mode.so need resolve text.
 */
public interface ConfigTextResolver {

  TextResolverResult resolve(String configText, List<ItemDTO> baseItems);

}
