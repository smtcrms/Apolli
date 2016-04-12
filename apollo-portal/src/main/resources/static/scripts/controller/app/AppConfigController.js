application_module.controller("AppConfigController",
                              ['$scope', '$location', 'toastr', 'AppService', 'ConfigService',
                               function ($scope, $location, toastr, AppService, ConfigService) {

                                   $scope.appId = $location.$$url.split("=")[1];

                                   /////////////

                                   AppService.load_nav_tree($scope.appId).then(function (result) {
                                       var navTree = [];
                                       var nodes = result.nodes;
                                       nodes.forEach(function (item) {
                                           var node = {};
                                           //first nav
                                           node.text = item.env;

                                           //second nav
                                           var clusterNodes = [];
                                           item.clusters.forEach(function (item) {
                                               var clusterNode = {};
                                               clusterNode.text = item.name;
                                               clusterNodes.push(clusterNode);
                                           });

                                           node.nodes = clusterNodes;
                                           navTree.push(node);
                                       });
                                       $('#treeview').treeview({
                                                                   color: "#428bca",
                                                                   showBorder: true,
                                                                   data: navTree,
                                                                   levels: 99
                                                               });
                                   }, function (result) {
                                       toastr.error("加载导航出错:" + result);
                                   });

                                   ///////////

                                   $scope.env = 'LOCAL';
                                   $scope.clusterName = 'default';
                                   ConfigService.load_all_namespaces($scope.appId, $scope.env, $scope.clusterName).then(
                                       function (result) {
                                           $scope.namespaces = result;

                                           //初始化视图
                                           if ($scope.namespaces) {
                                               $scope.namespaces.forEach(function (item) {
                                                   item.isModify = false;
                                                   item.viewType = 'table';
                                               })
                                           }

                                       }, function (result) {
                                           toastr.error("加载配置信息出错:" + result);
                                       });

                                   //更新配置
                                   $scope.modifyItems = function (namespace) {
                                       ConfigService.modify_items($scope.appId, $scope.env, $scope.clusterName,
                                                                  namespace.namespace.namespaceName, namespace.text).then(
                                           function (result) {
                                               if (result.code == 200){
                                                   toastr.success("更新成功");
                                               }else {
                                                   toastr.error("更新失败. code:" + result.code + " msg:" + result.msg);
                                               }
                                           },function (result) {

                                           }
                                       );
                                   };

                                   /////////
                                   $scope.queryOldValue = function (key, oldValue) {
                                       $scope.queryKey = key;
                                       if (oldValue == '') {
                                           $scope.OldValue = key + "是新添加的key";
                                       } else {
                                           $scope.OldValue = oldValue;
                                       }
                                   };

                                   $scope.switchView = function (namespace, viewType) {

                                       if ('textarea' == viewType) {
                                           namespace.text = parseTableModel2Text(namespace);
                                       } else if ('table' == viewType) {

                                       }
                                       namespace.viewType = viewType;
                                   };

                                   //把表格内容解析成文本
                                   function parseTableModel2Text(namespace) {
                                       if (!namespace.items) {
                                           return "无配置信息";
                                       }
                                       var result = "";
                                       namespace.items.forEach(function (item) {
                                           // if (item.modified) {
                                           //     result += "**";
                                           // }
                                           result +=
                                               item.item.key + ":" + item.item.value + " ##" + item.item.comment + "\n";
                                       });

                                       return result;
                                   }

                                   //把文本内容解析成表格

                               }]);

