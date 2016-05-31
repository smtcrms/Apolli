application_module.controller("ConfigNamespaceController",
                              ['$rootScope', '$scope', '$location', 'toastr', 'AppUtil', 'ConfigService',
                               function ($rootScope, $scope, $location, toastr, AppUtil, ConfigService) {

                                   var namespace_view_type = {
                                       TEXT: 'text',
                                       TABLE: 'table',
                                       LOG: 'log'
                                   };

                                   $rootScope.refreshNamespaces = function (viewType) {
                                       if ($rootScope.pageContext.env == '') {
                                           return;
                                       }
                                       ConfigService.load_all_namespaces($rootScope.pageContext.appId,
                                                                         $rootScope.pageContext.env,
                                                                         $rootScope.pageContext.clusterName,
                                                                         viewType).then(
                                           function (result) {
                                               $scope.namespaces = result;

                                               //初始化视图
                                               if ($scope.namespaces) {

                                                   $scope.namespaces.forEach(function (namespace) {
                                                       if (!viewType) {//default text view
                                                           $scope.switchView(namespace, namespace_view_type.TABLE);
                                                       } else if (viewType == namespace_view_type.TABLE) {
                                                           namespace.viewType = namespace_view_type.TABLE;
                                                       }

                                                       namespace.isTextEditing = false;
                                                   });
                                               }
                                               setInterval(function () {
                                                   $('[data-tooltip="tooltip"]').tooltip();
                                                   $('.namespace-view-table').bind('mousewheel DOMMouseScroll',
                                                                                   function (e) {
                                                                                       var e0 = e.originalEvent,
                                                                                           delta = e0.wheelDelta
                                                                                                   || -e0.detail;

                                                                                       this.scrollTop +=
                                                                                           ( delta < 0 ? 1 : -1 ) * 30;
                                                                                       e.preventDefault();
                                                                                   });
                                               }, 2500);

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "加载配置信息出错");
                                           });
                                   };

                                   $scope.switchView = function (namespace, viewType) {
                                       if (namespace_view_type.TEXT == viewType) {
                                           namespace.text = parseModel2Text(namespace);
                                       } else if (namespace_view_type.TABLE == viewType) {

                                       }
                                       namespace.viewType = viewType;
                                   };

                                   var MAX_ROW_SIZE = 30;
                                   var APPEND_ROW_SIZE = 8;
                                   //把表格内容解析成文本
                                   function parseModel2Text(namespace, modeType) {

                                       if (!namespace.items) {
                                           return "无配置信息";
                                       }
                                       var result = "";
                                       var itemCnt = 0;
                                       namespace.items.forEach(function (item) {
                                           if (item.item.key) {
                                               //use string \n to display as new line
                                               var itemValue = item.item.value.replace(/\n/g,"\\n");

                                               result +=
                                                   item.item.key + " = " + itemValue + "\n";
                                           } else {
                                               result += item.item.comment + "\n";
                                           }
                                           itemCnt++;
                                       });

                                       namespace.itemCnt =
                                           itemCnt > MAX_ROW_SIZE ? MAX_ROW_SIZE : itemCnt + APPEND_ROW_SIZE;
                                       return result;
                                   }

                                   $scope.toCommitNamespace = {};

                                   $scope.setCommitNamespace = function (namespace) {
                                       $scope.toCommitNamespace = namespace;
                                   };

                                   $scope.commitComment = '';
                                   //更新配置
                                   $scope.commitChange = function () {
                                       ConfigService.modify_items($scope.pageContext.appId, $scope.pageContext.env,
                                                                  $scope.pageContext.clusterName,
                                                                  $scope.toCommitNamespace.namespace.namespaceName,
                                                                  $scope.toCommitNamespace.editText,
                                                                  $scope.toCommitNamespace.namespace.id,
                                                                  $scope.commitComment).then(
                                           function (result) {
                                               toastr.success("更新成功");
                                               //refresh all namespace items
                                               $rootScope.refreshNamespaces();

                                               $scope.toCommitNamespace.commited = true;
                                               $scope.toggleTextEditStatus($scope.toCommitNamespace);

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "更新失败");
                                           }
                                       );
                                   };

                                   //文本编辑框状态切换
                                   $scope.toggleTextEditStatus = function (namespace) {
                                       namespace.isTextEditing = !namespace.isTextEditing;
                                       if (namespace.isTextEditing) {//切换为编辑状态
                                           $scope.toCommitNamespace.commited = false;
                                           namespace.backupText = namespace.text;
                                           namespace.editText = parseModel2Text(namespace, 'edit');

                                       } else {
                                           if (!$scope.toCommitNamespace.commited) {//取消编辑,则复原
                                               namespace.text = namespace.backupText;
                                           }
                                       }
                                   };

                                   var releaseModal = $('#releaseModal');
                                   $scope.toReleaseNamespace = {};

                                   $scope.prepareReleaseNamespace = function (namespace) {
                                       $scope.releaseTitle = new Date().Format("yyyy-MM-dd hh:mm:ss");
                                       $scope.toReleaseNamespace = namespace;
                                   };

                                   $scope.releaseComment = '';

                                   $scope.release = function () {
                                       ConfigService.release($rootScope.pageContext.appId, $rootScope.pageContext.env,
                                                             $rootScope.pageContext.clusterName,
                                                             $scope.toReleaseNamespace.namespace.namespaceName,
                                                             $scope.releaseTitle,
                                                             $scope.releaseComment).then(
                                           function (result) {
                                               releaseModal.modal('hide');
                                               toastr.success("发布成功");
                                               //refresh all namespace items
                                               $rootScope.refreshNamespaces();

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "发布失败");

                                           }
                                       );
                                   };

                                   var TABLE_VIEW_OPER_TYPE = {
                                       RETRIEVE: 'retrieve',
                                       CREATE: 'create',
                                       UPDATE: 'update'
                                   };

                                   $scope.tableViewOperType = '', $scope.item = {};

                                   //查看配置
                                   $scope.retrieveItem = function (item, oldValue) {
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.RETRIEVE);
                                       $scope.item = item;
                                       $scope.item.oldValue = oldValue;
                                   };

                                   var toDeleteItemId = 0;
                                   $scope.preDeleteItem = function (itemId) {
                                       toDeleteItemId = itemId;
                                   };

                                   $scope.deleteItem = function () {
                                       ConfigService.delete_item($rootScope.pageContext.env, toDeleteItemId).then(
                                           function (result) {
                                               toastr.success("删除成功!");
                                               $rootScope.refreshNamespaces();
                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "删除失败");
                                           });
                                   };

                                   var toOperationNamespaceName = '';
                                   //修改配置
                                   $scope.editItem = function (namespace, item) {
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.UPDATE);
                                       $scope.item = item;
                                       toOperationNamespaceName = namespace.namespace.namespaceName;
                                   };

                                   //新增配置
                                   $scope.createItem = function (namespace) {
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.CREATE);
                                       $scope.item = {};
                                       toOperationNamespaceName = namespace.namespace.namespaceName;
                                   };

                                   $scope.switchToEdit = function () {
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.UPDATE);
                                   };

                                   var selectedClusters = [];
                                   $scope.collectSelectedClusters = function (data) {
                                       selectedClusters = data;
                                   };

                                   function switchTableViewOperType(type) {
                                       $scope.tableViewOperType = type;
                                   }

                                   var itemModal = $("#itemModal");
                                   $scope.doItem = function () {

                                       if (selectedClusters.length == 0) {
                                           toastr.error("请选择集群");
                                       } else {
                                           selectedClusters.forEach(function (cluster) {
                                               if ($scope.tableViewOperType == TABLE_VIEW_OPER_TYPE.CREATE) {

                                                   ConfigService.create_item($rootScope.pageContext.appId,
                                                                             cluster.env,
                                                                             cluster.name,
                                                                             toOperationNamespaceName,
                                                                             $scope.item).then(
                                                       function (result) {
                                                           toastr.success("[" + cluster.env + "," + cluster.name + "]",
                                                                          "创建成功");
                                                           itemModal.modal('hide');
                                                           $rootScope.refreshNamespaces(namespace_view_type.TABLE);
                                                       }, function (result) {
                                                           toastr.error(AppUtil.errorMsg(result), "添加失败");
                                                       });

                                               } else if ($scope.tableViewOperType == TABLE_VIEW_OPER_TYPE.UPDATE) {

                                                   ConfigService.update_item($rootScope.pageContext.appId,
                                                                             cluster.env,
                                                                             cluster.name,
                                                                             toOperationNamespaceName,
                                                                             $scope.item).then(
                                                       function (result) {
                                                           toastr.success("[" + cluster.env + "," + cluster.name + "]",
                                                                          "更新成功");
                                                           itemModal.modal('hide');
                                                           $rootScope.refreshNamespaces(namespace_view_type.TABLE);
                                                       }, function (result) {
                                                           toastr.error(AppUtil.errorMsg(result), "更新失败");
                                                       });
                                               }
                                           });
                                       }

                                   };

                                   $('.config-item-container').removeClass('hide');
                               }]);

