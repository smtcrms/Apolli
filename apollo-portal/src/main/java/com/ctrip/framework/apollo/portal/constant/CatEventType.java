package com.ctrip.framework.apollo.portal.constant;

public interface CatEventType {

  String RELEASE_NAMESPACE = "Namespace.Release";

  String MODIFY_NAMESPACE_BY_TEXT = "Namespace.Modify.Text";

  String MODIFY_NAMESPACE = "Namespace.Modify";

  String SYNC_NAMESPACE = "Namespace.Sync";

  String CREATE_APP = "App.Create";

  String CREATE_CLUSTER = "Cluster.Create";

  String CREATE_NAMESPACE = "Namespace.Create";

  String API_RETRY = "API.Retry";

  String USER_ACCESS = "User.Access";

}
