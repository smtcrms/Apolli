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
                                           if($scope.namespaces){
                                               $scope.namespaces.forEach(function(item){
                                                   item.viewType = 'table';
                                               })
                                           }

                                       }, function (result) {
                                           toastr.error("加载配置信息出错:" + result);
                                       });

                                   /////////
                                   $scope.queryOldValue = function (key, oldValue) {
                                       $scope.queryKey = key;
                                       if (oldValue == '') {
                                           $scope.OldValue = key + "是新添加的key";
                                       } else {
                                           $scope.OldValue = oldValue;
                                       }
                                   };

                                   $scope.switchView = function(namespace, viewType){

                                       if('textarea' == viewType){
                                           namespace.text = parseTableModel2Text(namespace);
                                       }
                                        namespace.viewType = viewType;
                                   };

                                   function parseTableModel2Text(namespace){
                                       if(!namespace.items){
                                           return "无配置信息";
                                       }
                                       var result = "";
                                       namespace.items.forEach(function(item){
                                           if(item.modified){
                                               result += "**";
                                           }
                                           result += item.item.key + ":" + item.item.value + " ##" + item.item.comment + "\n";
                                       });

                                       return result;
                                   }

                               }]);

