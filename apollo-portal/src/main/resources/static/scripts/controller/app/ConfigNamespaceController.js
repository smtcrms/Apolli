application_module.controller("ConfigNamespaceController",
                              ['$rootScope', '$scope', '$location', 'toastr', 'AppUtil', 'ConfigService', 'PermissionService',
                               'CommitService',
                               function ($rootScope, $scope, $location, toastr, AppUtil, ConfigService, PermissionService, CommitService) {

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
                                                       
                                                       //permission
                                                       PermissionService.has_modify_namespace_permission($rootScope.pageContext.appId, namespace.namespace.namespaceName)
                                                           .then(function (result) {
                                                               namespace.hasModifyPermission = result.hasPermission;     
                                                           }, function (result) {
                                                               
                                                           });

                                                       PermissionService.has_release_namespace_permission($rootScope.pageContext.appId, namespace.namespace.namespaceName)
                                                           .then(function (result) {
                                                               namespace.hasReleasePermission = result.hasPermission;
                                                           }, function (result) {

                                                           });
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

                                   
                                   PermissionService.get_app_role_users($rootScope.pageContext.appId)
                                       .then(function (result) {
                                           var masterUsers = '';
                                            result.masterUsers.forEach(function (user) {
                                                masterUsers += user.userId + ',';     
                                            }); 
                                           $scope.masterUsers = masterUsers.substring(0, masterUsers.length - 1);
                                       }, function (result) {
                                           
                                       });
                                   $scope.switchView = function (namespace, viewType) {
                                       namespace.viewType = viewType;
                                       if (namespace_view_type.TEXT == viewType) {
                                           namespace.text = parseModel2Text(namespace);
                                       } else if (namespace_view_type.TABLE == viewType) {

                                       } else {
                                           $scope.loadCommitHistory(namespace);
                                       }
                                   };

                                   $scope.loadCommitHistory = function(namespace) {
                                       if (!namespace.commits){
                                           namespace.commits = [];
                                           namespace.commitPage = 0;
                                       }
                                       CommitService.find_commits($rootScope.pageContext.appId,
                                                                  $rootScope.pageContext.env,
                                                                  $rootScope.pageContext.clusterName,
                                                                  namespace.namespace.namespaceName,
                                                                  namespace.commitPage)
                                           .then(function (result) {
                                               if (result.length == 0){
                                                   namespace.hasLoadAllCommit = true;
                                               }
                                               for (var i = 0; i < result.length; i++) {
                                                   //to json
                                                   result[i].changeSets = JSON.parse(result[i].changeSets);
                                                   namespace.commits.push(result[i]);
                                               }
                                               namespace.commitPage += 1;
                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "加载修改历史记录出错");
                                           });
                                   }

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
                                           //deleted key
                                           if (!item.item.lastModifiedBy){
                                               return;
                                           }
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

                                   //更新配置
                                   $scope.commitChange = function (namespace) {
                                       ConfigService.modify_items($scope.pageContext.appId, $scope.pageContext.env,
                                                                  $scope.pageContext.clusterName,
                                                                  namespace.namespace.namespaceName,
                                                                  namespace.editText,
                                                                  namespace.namespace.id).then(
                                           function (result) {
                                               toastr.success("更新成功");
                                               //refresh all namespace items
                                               $rootScope.refreshNamespaces();

                                               namespace.commited = true;
                                               $scope.toggleTextEditStatus(namespace);

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "更新失败");
                                           }
                                       );
                                   };

                                   //文本编辑框状态切换
                                   $scope.toggleTextEditStatus = function (namespace) {
                                       namespace.isTextEditing = !namespace.isTextEditing;
                                       if (namespace.isTextEditing) {//切换为编辑状态
                                           namespace.commited = false;
                                           namespace.backupText = namespace.text;
                                           namespace.editText = parseModel2Text(namespace, 'edit');

                                       } else {
                                           if (!namespace.commited) {//取消编辑,则复原
                                               namespace.text = namespace.backupText;
                                           }
                                       }
                                   };

                                   var releaseModal = $('#releaseModal');
                                   $scope.toReleaseNamespace = {};

                                   $scope.prepareReleaseNamespace = function (namespace) {
                                       if (!namespace.hasReleasePermission){
                                           $('#releaseNoPermissionDialog').modal('show');
                                           return;
                                       }else {
                                           $('#releaseModal').modal('show');
                                       }
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
                                   $scope.retrieveItem = function (namespace, item, oldValue) {
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.RETRIEVE);
                                       $scope.item = item;
                                       $scope.item.oldValue = oldValue;
                                       toOperationNamespaceName = namespace.namespace.namespaceName;
                                       $scope.hasModifyPermission = namespace.hasModifyPermission;
                                   };

                                   var toDeleteItemId = 0, toDeleteNamespace = {};
                                   $scope.preDeleteItem = function (namespace, itemId) {
                                       toDeleteNamespace = namespace;
                                       toDeleteItemId = itemId;
                                   };

                                   $scope.deleteItem = function () {
                                       ConfigService.delete_item($rootScope.pageContext.appId,
                                                                 $rootScope.pageContext.env,
                                                                 $rootScope.pageContext.clusterName,
                                                                 toDeleteNamespace.namespace.namespaceName,
                                                                 toDeleteItemId).then(
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
                                                           toastr.success(cluster.env + " , " + $scope.item.key,
                                                                          "添加成功");
                                                           itemModal.modal('hide');
                                                           $rootScope.refreshNamespaces(namespace_view_type.TABLE);
                                                       }, function (result) {
                                                           toastr.error(AppUtil.errorMsg(result), "添加失败");
                                                       });

                                               } else if ($scope.tableViewOperType == TABLE_VIEW_OPER_TYPE.UPDATE) {
                                                   if (!$scope.item.value){
                                                       $scope.item.value = "";
                                                   }
                                                   if (!$scope.item.comment){
                                                       $scope.item.comment = "";
                                                   }
                                                   ConfigService.update_item($rootScope.pageContext.appId,
                                                                             cluster.env,
                                                                             cluster.name,
                                                                             toOperationNamespaceName,
                                                                             $scope.item).then(
                                                       function (result) {
                                                           toastr.success("更新成功, 如需生效请发布");
                                                           itemModal.modal('hide');
                                                           $rootScope.refreshNamespaces(namespace_view_type.TABLE);
                                                       }, function (result) {
                                                           toastr.error(AppUtil.errorMsg(result), "更新失败");
                                                       });
                                               }
                                           });
                                       }

                                   };
                                   
                                   //permission
                                   PermissionService.has_assign_user_permission($rootScope.pageContext.appId)
                                       .then(function (result) {
                                           $scope.hasAssignUserPermission = result.hasPermission;
                                       }, function (result) {
                                           
                                       });

                                   $('.config-item-container').removeClass('hide');
                               }]);

