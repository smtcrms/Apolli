sync_item_module.controller("SyncItemController",
                              ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil', 'ConfigService',
                               function ($scope, $location, $window, toastr, AppService, AppUtil, ConfigService) {

                                   var params = AppUtil.parseParams($location.$$url);
                                   var currentUser = 'test_user';
                                   $scope.pageContext = {
                                       appId: params.appid,
                                       env: params.env,
                                       clusterName: params.clusterName,
                                       namespaceName: params.namespaceName
                                   };
                                   
                                   ////// load env //////
                                   AppService.load_nav_tree($scope.pageContext.appId).then(function (result) {
                                       $scope.namespaceIdentifers = [];
                                       result.nodes.forEach(function (node) {
                                           var env = node.env;
                                           node.clusters.forEach(function (cluster) {
                                               cluster.env = env;
                                               cluster.checked = false;
                                               if (env != $scope.pageContext.env || cluster.name != $scope.pageContext.clusterName){
                                                   $scope.namespaceIdentifers.push(cluster);
                                               }
                                           })
                                       });
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "加载环境出错");    
                                   });

                                   var envAllSelected = false;
                                   $scope.toggleEnvsCheckedStatus = function () {
                                       envAllSelected = !envAllSelected;
                                       $scope.namespaceIdentifers.forEach(function (namespaceIdentifer) {
                                           namespaceIdentifer.checked = envAllSelected;
                                       })
                                   };
                                   
                                   ////// load items //////
                                   ConfigService.find_items($scope.pageContext.appId, $scope.pageContext.env,
                                                            $scope.pageContext.clusterName, $scope.pageContext.namespaceName).then(function (result) {

                                       $scope.sourceItems = [];
                                       result.forEach(function (item) {
                                           if (item.key){
                                               item.checked = false;
                                               $scope.sourceItems.push(item);
                                           }
                                       })
                                       
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "加载配置出错");
                                   });

                                   var itemAllSelected = false;
                                   $scope.toggleItemsCheckedStatus = function () {
                                       itemAllSelected = !itemAllSelected;
                                       $scope.sourceItems.forEach(function (item) {
                                           item.checked = itemAllSelected;
                                       })       
                                   };

                                   $scope.diff = function () {
                                       ConfigService.diff($scope.pageContext.namespaceName, parseSyncSourceData()).then(function (result) {
                                           $scope.diffs = result;
                                           $scope.syncItemNextStep(1);
                                       }, function (result) {
                                           toastr.error(AppUtil.errorMsg(result));
                                       });
                                   };
                                   
                                   $scope.syncItems = function () {
                                    ConfigService.sync_items($scope.pageContext.namespaceName, parseSyncSourceData()).then(function (result) {
                                        $scope.syncItemStep += 1;
                                    }, function (result) {
                                        toastr.error(AppUtil.errorMsg(result));
                                    });    
                                   };
                                   
                                   function parseSyncSourceData() {
                                       var sourceData = {
                                           syncToNamespaces: [],
                                           syncItems: []
                                       };
                                       var namespaceName = $scope.pageContext.namespaceName;
                                       $scope.namespaceIdentifers.forEach(function (namespaceIdentifer) {
                                           if (namespaceIdentifer.checked){
                                               namespaceIdentifer.clusterName = namespaceIdentifer.name;
                                               namespaceIdentifer.namespaceName = namespaceName;
                                               sourceData.syncToNamespaces.push(namespaceIdentifer);
                                           }
                                       });
                                       $scope.sourceItems.forEach(function (item) {
                                           if (item.checked) {
                                               sourceData.syncItems.push(item);
                                           }
                                       });
                                       return sourceData;
                                   }

                                   ////// flow control ///////

                                   $scope.syncItemStep = 1;
                                   $scope.syncItemNextStep = function (offset) {
                                       $scope.syncItemStep += offset;
                                   };

                                   $scope.return = function () {
                                       $window.location.href = '/views/app.html?#appid=' + $scope.pageContext.appId;
                                   };

                                   $scope.switchSelect = function (o) {
                                       o.checked = !o.checked;
                                   }
                               }]);

