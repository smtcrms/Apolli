application_module.controller("ConfigNamespaceController",
                              ['$rootScope', '$scope', '$location', 'toastr', 'AppUtil', 'ConfigService',
                               function ($rootScope, $scope, $location, toastr, AppUtil, ConfigService) {

                                   ////// namespace //////

                                   var namespace_view_type = {
                                       TEXT:'text',
                                       TABLE: 'table',
                                       LOG: 'log'
                                   };

                                   $rootScope.refreshNamespaces = function (viewType) {
                                       if ($rootScope.pageContext.env == ''){
                                           return;
                                       }
                                       ConfigService.load_all_namespaces($rootScope.pageContext.appId, $rootScope.pageContext.env,
                                                                         $rootScope.pageContext.clusterName, viewType).then(
                                           function (result) {
                                               $scope.namespaces = result;

                                               //初始化视图
                                               if ($scope.namespaces) {
                                                   
                                                   $scope.namespaces.forEach(function (item) {
                                                       item.isModify = false;
                                                       if (!viewType) {//default text view
                                                           $scope.switchView(item, namespace_view_type.TEXT);
                                                       } else if (viewType == namespace_view_type.TABLE) {
                                                           item.viewType = namespace_view_type.TABLE;
                                                       }

                                                       item.isTextEditing = false;
                                                   });
                                               }

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "加载配置信息出错");
                                           });
                                   }

                                   ////// global view oper //////

                                   $scope.switchView = function (namespace, viewType) {
                                       if (namespace_view_type.TEXT == viewType) {
                                           namespace.text = parseModel2Text(namespace);
                                       } else if (namespace_view_type.TABLE == viewType) {

                                       }
                                       namespace.viewType = viewType;
                                   };
                                   
                                   var MAX_ROW_SIZE = 30;
                                   //把表格内容解析成文本
                                   function parseModel2Text(namespace) {
                                       
                                       if (!namespace.items) {
                                           return "无配置信息";
                                       }
                                       var result = "";
                                       var itemCnt = 0;
                                       namespace.items.forEach(function (item) {
                                           if (item.item.key) {
                                               result +=
                                                   item.item.key + " = " + item.item.value + "\n";
                                           } else {
                                               result += item.item.comment + "\n";
                                           }
                                           itemCnt ++;
                                       });

                                       namespace.itemCnt = itemCnt > MAX_ROW_SIZE ? MAX_ROW_SIZE : itemCnt + 3;
                                       return result;
                                   }

                                   ////// text view oper //////

                                   $scope.draft = {};
                                   //保存草稿
                                   $scope.saveDraft = function (namespace) {
                                       $scope.draft = namespace;
                                   };

                                   $scope.commitComment = '';
                                   //更新配置
                                   $scope.commitChange = function () {
                                       ConfigService.modify_items($scope.pageContext.appId, $scope.pageContext.env, $scope.pageContext.clusterName,
                                                                  $scope.draft.namespace.namespaceName, $scope.draft.text,
                                                                  $scope.draft.namespace.id, $scope.commitComment).then(
                                           function (result) {
                                               toastr.success("更新成功");
                                               //refresh all namespace items
                                               $rootScope.refreshNamespaces();

                                               $scope.draft.backupText = '';//清空备份文本
                                               $scope.toggleTextEditStatus($scope.draft);

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "更新失败");
                                           }
                                       );
                                   };


                                   //文本编辑框状态切换
                                   $scope.toggleTextEditStatus = function (namespace) {
                                       namespace.isTextEditing = !namespace.isTextEditing;
                                       if (namespace.isTextEditing){//切换为编辑状态,保存一下原来值
                                           $scope.draft.backupText = namespace.text;
                                       }else {
                                           if ($scope.draft.backupText){//取消编辑,则复原
                                               namespace.text = $scope.draft.backupText;
                                           }
                                       }
                                   };

                                   ////// table view oper //////

                                   $scope.watch = {};
                                   //查看配置
                                   $scope.watchItem = function (key, value, oldValue) {
                                       $scope.watch.key = key;
                                       $scope.watch.value = value;
                                       $scope.watch.oldValue = oldValue;
                                   };
                                   
                                   /////// release ///////
                                   var releaseNamespace = {};
                                   
                                   $scope.prepareReleaseNamespace = function (namespace) {
                                       releaseNamespace = namespace;        
                                   };
                                   $scope.releaseComment = '';
                                   $scope.releaseTitle = '';
                                   $scope.release = function () {
                                       ConfigService.release($rootScope.pageContext.appId, $rootScope.pageContext.env,
                                                             $rootScope.pageContext.clusterName,
                                                             releaseNamespace.namespace.namespaceName, $scope.releaseTitle,
                                                             $scope.releaseComment).then(
                                           function (result) {
                                               toastr.success("发布成功");
                                               //refresh all namespace items
                                               $rootScope.refreshNamespaces();

                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result),  "发布失败");

                                           }
                                       );    
                                   };
                                   
                               }]);

