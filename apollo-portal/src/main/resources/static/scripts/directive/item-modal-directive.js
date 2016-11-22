directive_module.directive('itemmodal', itemModalDirective);

function itemModalDirective(toastr, AppUtil, EventManager, ConfigService) {
    return {
        restrict: 'E',
        templateUrl: '../../views/component/item-modal.html',
        transclude: true,
        replace: true,
        scope: {
            appId: '=',
            env: '=',
            cluster: '=',
            toOperationNamespace: '=',
            item: '='
        },
        link: function (scope) {


            var TABLE_VIEW_OPER_TYPE = {
                CREATE: 'create',
                UPDATE: 'update'
            };

            scope.doItem = doItem;
            scope.collectSelectedClusters = collectSelectedClusters;

            function doItem() {

                if (!scope.item.value) {
                    scope.item.value = "";
                }

                if (scope.item.tableViewOperType == TABLE_VIEW_OPER_TYPE.CREATE) {

                    //check key unique
                    var hasRepeatKey = false;
                    scope.toOperationNamespace.items.forEach(function (item) {
                        if (!item.isDeleted && scope.item.key == item.item.key) {
                            toastr.error("key=" + scope.item.key + " 已存在");
                            hasRepeatKey = true;
                        }
                    });
                    if (hasRepeatKey) {
                        return;
                    }

                    scope.item.addItemBtnDisabled = true;

                    if (scope.toOperationNamespace.isBranch) {
                        ConfigService.create_item(scope.appId,
                                                  scope.env,
                                                  scope.toOperationNamespace.baseInfo.clusterName,
                                                  scope.toOperationNamespace.baseInfo.namespaceName,
                                                  scope.item).then(
                            function (result) {
                                
                                EventManager.emit(EventManager.EventType.REFRESH_NAMESPACE,
                                                  {
                                                      namespace: scope.toOperationNamespace
                                                  });
                                toastr.success("添加成功,如需生效请发布");
                            }, function (result) {
                                toastr.error(AppUtil.errorMsg(result), "添加失败");
                            });
                    } else {
                        if (selectedClusters.length == 0) {
                            toastr.error("请选择集群");
                            return;
                        }

                        selectedClusters.forEach(function (cluster) {
                            ConfigService.create_item(scope.appId,
                                                      cluster.env,
                                                      cluster.name,
                                                      scope.toOperationNamespace.baseInfo.namespaceName,
                                                      scope.item).then(
                                function (result) {
                                    toastr.success(cluster.env + " , " + scope.item.key, "添加成功,如需生效请发布");
                                    if (cluster.env == scope.env &&
                                        cluster.name == scope.cluster) {

                                        EventManager.emit(EventManager.EventType.REFRESH_NAMESPACE,
                                                          {
                                                              namespace: scope.toOperationNamespace
                                                          });
                                    }
                                }, function (result) {
                                    toastr.error(AppUtil.errorMsg(result), "添加失败");
                                });
                        });
                    }

                    scope.item.addItemBtnDisabled = false;
                    AppUtil.hideModal('#itemModal');

                } else {

                    if (!scope.item.comment) {
                        scope.item.comment = "";
                    }

                    ConfigService.update_item(scope.appId,
                                              scope.env,
                                              scope.toOperationNamespace.baseInfo.clusterName,
                                              scope.toOperationNamespace.baseInfo.namespaceName,
                                              scope.item).then(
                        function (result) {
                            EventManager.emit(EventManager.EventType.REFRESH_NAMESPACE,
                                              {
                                                  namespace: scope.toOperationNamespace
                                              });
                            
                            AppUtil.hideModal('#itemModal');

                            toastr.success("更新成功, 如需生效请发布");
                        }, function (result) {
                            toastr.error(AppUtil.errorMsg(result), "更新失败");
                        });
                }

            }

            var selectedClusters = [];
            function collectSelectedClusters(data) {
                selectedClusters = data;
            }
        }
    }
}


