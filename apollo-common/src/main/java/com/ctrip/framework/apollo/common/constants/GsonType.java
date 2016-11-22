package com.ctrip.framework.apollo.common.constants;

import com.google.gson.reflect.TypeToken;

import com.ctrip.framework.apollo.common.dto.GrayReleaseRuleItemDTO;

import java.lang.reflect.Type;
import java.util.Map;
import java.util.Set;

public interface GsonType {

  Type CONFIG = new TypeToken<Map<String, String>>() {}.getType();

}
