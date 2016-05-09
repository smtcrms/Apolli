application_module.controller("LinkNamespaceController",
                              ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil', 'NamespaceService',
                               function ($scope, $location, $window, toastr, AppService, AppUtil, NamespaceService) {

                                   var params = AppUtil.parseParams($location.$$url);
                                   $scope.appId = params.appid;
                                   $scope.type = params.type;

                                   $scope.step = 1;

                                   ////// load env //////
                                   AppService.load_nav_tree($scope.appId).then(function (result) {
                                       $scope.namespaceIdentifers = [];
                                       result.nodes.forEach(function (node) {
                                           var env = node.env;
                                           node.clusters.forEach(function (cluster) {
                                               cluster.env = env;
                                               cluster.checked = false;
                                               $scope.namespaceIdentifers.push(cluster);
                                           })
                                       });
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "加载环境出错");
                                   });
                                   
                                   NamespaceService.find_public_namespaces().then(function (result) {
                                       var publicNamespaces = [];
                                       result.forEach(function (item) {
                                            var namespace = {};
                                           namespace.id = item.name;
                                           namespace.text = item.name;
                                           publicNamespaces.push(namespace);
                                       }); 
                                       $('#namespaces').select2({
                                                                    width: '250px',
                                                                    data: publicNamespaces
                                                                });
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "load public namespace error");
                                   });

                                   $scope.appNamespace = {
                                       appId:$scope.appId,
                                       name:'',
                                       comment:''
                                   };
                                   $scope.createNamespace = function () {
                                       if ($scope.type == 'link'){
                                           var selectedClusters = collectSelectedClusters();
                                           if (selectedClusters.length == 0){
                                               toastr.warning("请选择集群");
                                               return;
                                           }
                                           var selectedClustersSize = selectedClusters.length;

                                           if ($scope.namespaceType == 1){
                                               $scope.namespaceName = $('#namespaces').select2('data')[0].id;
                                           }

                                           var hasCreatedClusterCnt = 0;
                                           selectedClusters.forEach(function (cluster) {
                                               NamespaceService.createNamespace($scope.appId, cluster.env, cluster.clusterName,
                                                                                $scope.namespaceName).then(function (result) {
                                                   toastr.success(
                                                       cluster.env + "_" + result.clusterName + "_" + result.namespaceName
                                                       + "创建成功");
                                                   hasCreatedClusterCnt ++;
                                                   if (hasCreatedClusterCnt == selectedClustersSize){
                                                       $scope.step = 2;
                                                   }
                                               }, function (result) {
                                                   toastr.error(AppUtil.errorMsg(result),
                                                                cluster.env + "_" + cluster.clusterName + "_"
                                                                + $scope.namespaceName + "创建失败");
                                               });
                                           });
                                       }else {
                                           NamespaceService.createAppNamespace($scope.appId, $scope.appNamespace).then(function (result) {
                                               $scope.step = 2;
                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "创建失败");
                                           });
                                       }

                                   };

                                   var envAllSelected = false;
                                   $scope.toggleEnvsCheckedStatus = function () {
                                       envAllSelected = !envAllSelected;
                                       $scope.namespaceIdentifers.forEach(function (namespaceIdentifer) {
                                           namespaceIdentifer.checked = envAllSelected;
                                       })
                                   };

                                   function collectSelectedClusters() {
                                       var selectedClusters = [];
                                       $scope.namespaceIdentifers.forEach(function (namespaceIdentifer) {
                                           if (namespaceIdentifer.checked){
                                               namespaceIdentifer.clusterName = namespaceIdentifer.name;
                                               selectedClusters.push(namespaceIdentifer);
                                           }
                                       });
                                       return selectedClusters;
                                   }


                                   $scope.namespaceType = 1;
                                   $scope.selectNamespaceType = function (type) {
                                       $scope.namespaceType = type;
                                   };

                                   $scope.switchSelect = function (o) {
                                       o.checked = !o.checked;
                                   };
                                   
                                   $scope.back = function () {
                                       $window.location.href = '/config.html?#appid=' + $scope.appId;    
                                   };
                               }]);

