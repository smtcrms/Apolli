package com.ctrip.framework.apollo.common.constants;

import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.Map;

public interface GsonType {

  Type CONFIG = new TypeToken<Map<String, String>>() {}.getType();

}
