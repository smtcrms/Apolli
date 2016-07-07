application_module.controller("ConfigNamespaceController",
                              ['$rootScope', '$scope', '$window', '$location', 'toastr', 'AppUtil', 'ConfigService',
                               'PermissionService',
                               'CommitService', 'NamespaceLockService', 'UserService',
                               function ($rootScope, $scope, $window,  $location, toastr, AppUtil, ConfigService,
                                         PermissionService,
                                         CommitService, NamespaceLockService, UserService) {

                                   var namespace_view_type = {
                                       TEXT: 'text',
                                       TABLE: 'table',
                                       LOG: 'log'
                                   };

                                   var TABLE_VIEW_OPER_TYPE = {
                                       RETRIEVE: 'retrieve',
                                       CREATE: 'create',
                                       UPDATE: 'update'
                                   };


                                   $rootScope.refreshNamespaces = refreshNamespaces;
                                   
                                   $scope.commitChange = commitChange;
                                   
                                   $scope.prepareReleaseNamespace = prepareReleaseNamespace;
                                   
                                   $scope.release = release;
                                   
                                   $scope.retrieveItem = retrieveItem;
                                   
                                   $scope.preDeleteItem = preDeleteItem;
                                   
                                   $scope.deleteItem = deleteItem;
                                   
                                   $scope.editItem = editItem;
                                   
                                   $scope.createItem = createItem;
                                   
                                   $scope.doItem = doItem;
                                   

                                   PermissionService.get_app_role_users($rootScope.pageContext.appId)
                                       .then(function (result) {
                                           var masterUsers = '';
                                           result.masterUsers.forEach(function (user) {
                                               masterUsers += user.userId + ',';
                                           });
                                           $scope.masterUsers = masterUsers.substring(0, masterUsers.length - 1);
                                       }, function (result) {

                                       });
                                   
                                   UserService.load_user().then(function (result) {
                                       $scope.currentUser = result.userId;
                                   });

                                   function refreshNamespaces(viewType) {
                                       if ($rootScope.pageContext.env == '') {
                                           return;
                                       }
                                       ConfigService.load_all_namespaces($rootScope.pageContext.appId,
                                                                         $rootScope.pageContext.env,
                                                                         $rootScope.pageContext.clusterName,
                                                                         viewType).then(
                                           function (result) {
                                               $scope.namespaces = result;

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

                                   function commitChange(namespace) {
                                       var model = {
                                           configText: namespace.editText,
                                           namespaceId: namespace.namespace.id,
                                           format: namespace.format
                                       };
                                       ConfigService.modify_items($rootScope.pageContext.appId, $rootScope.pageContext.env,
                                                                  $rootScope.pageContext.clusterName,
                                                                  namespace.namespace.namespaceName,
                                                                  model).then(
                                           function (result) {
                                               toastr.success("更新成功, 如需生效请发布");
                                               //refresh all namespace items
                                               $rootScope.refreshNamespaces();

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "更新失败");
                                           }
                                       );
                                   }
                                   var releaseModal = $('#releaseModal');
                                   $scope.toReleaseNamespace = {};
                                   function prepareReleaseNamespace(namespace) {
                                       if (!namespace.hasReleasePermission) {
                                           $('#releaseNoPermissionDialog').modal('show');
                                           return;
                                       } else if (namespace.lockOwner && $scope.currentUser == namespace.lockOwner){
                                           //自己修改不能自己发布
                                           $('#releaseDenyDialog').modal('show');
                                       } else {
                                           $('#releaseModal').modal('show');
                                       }
                                       $scope.releaseTitle = new Date().Format("yyyy-MM-dd hh:mm:ss");
                                       $scope.toReleaseNamespace = namespace;
                                   }

                                   $scope.releaseComment = '';
                                   function release() {
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
                                   }



                                   $scope.tableViewOperType = '', $scope.item = {};

                                   //查看配置
                                   function retrieveItem(namespace, item, oldValue) {
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.RETRIEVE);
                                       $scope.item = item;
                                       $scope.item.oldValue = oldValue;
                                       toOperationNamespaceName = namespace.namespace.namespaceName;
                                       $scope.hasModifyPermission = namespace.hasModifyPermission;
                                   }

                                   var toDeleteItemId = 0, toDeleteNamespace = {};
                                   function preDeleteItem(namespace, itemId) {
                                       if (!lockCheck(namespace)){
                                           return;
                                       }

                                       toDeleteNamespace = namespace;
                                       toDeleteItemId = itemId;

                                       $("#deleteConfirmDialog").modal("show");
                                   }

                                   function deleteItem() {
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
                                   }

                                   var toOperationNamespaceName = '';
                                   //修改配置
                                   function editItem(namespace, item) {
                                       if (!lockCheck(namespace)){
                                           return;
                                       }
                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.UPDATE);
                                       $scope.item = item;
                                       toOperationNamespaceName = namespace.namespace.namespaceName;

                                       $("#itemModal").modal("show");
                                   }

                                   //新增配置
                                   function createItem(namespace) {
                                       if (!lockCheck(namespace)){
                                           return;
                                       }

                                       switchTableViewOperType(TABLE_VIEW_OPER_TYPE.CREATE);
                                       $scope.item = {};
                                       toOperationNamespaceName = namespace.namespace.namespaceName;
                                       $('#itemModal').modal('show');
                                   }

                                   var selectedClusters = [];
                                   $scope.collectSelectedClusters = function (data) {
                                       selectedClusters = data;
                                   };

                                   function switchTableViewOperType(type) {
                                       $scope.tableViewOperType = type;
                                   }

                                   var itemModal = $("#itemModal");
                                   function doItem() {

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
                                                   if (!$scope.item.value) {
                                                       $scope.item.value = "";
                                                   }
                                                   if (!$scope.item.comment) {
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

                                   }

                                   function lockCheck(namespace) {
                                       if (namespace.lockOwner && scope.currentUser != namespace.lockOwner) {
                                           scope.lockOwner = namespace.lockOwner;
                                           $('#namespaceLockedDialog').modal('show');
                                           return false;
                                       }
                                       return true;
                                   }

                                   $('.config-item-container').removeClass('hide');
                               }]);

