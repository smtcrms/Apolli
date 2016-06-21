namespace_module.controller("LinkNamespaceController",
                              ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil', 'NamespaceService',
                               function ($scope, $location, $window, toastr, AppService, AppUtil, NamespaceService) {

                                   var params = AppUtil.parseParams($location.$$url);
                                   $scope.appId = params.appid;
                                   $scope.type = params.type;

                                   $scope.step = 1;

                                   NamespaceService.find_public_namespaces().then(function (result) {
                                       var publicNamespaces = [];
                                       result.forEach(function (item) {
                                            var namespace = {};
                                           namespace.id = item.name;
                                           namespace.text = item.name;
                                           publicNamespaces.push(namespace);
                                       });
                                       $('#namespaces').select2({
                                            placeholder: '请选择Namespace',
                                            width: '100%',
                                            data: publicNamespaces
                                       });
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "load public namespace error");
                                   });

                                   AppService.load($scope.appId).then(function (result) {
                                       $scope.appBaseInfo = result;
                                       $scope.appBaseInfo.namespacePrefix = result.orgId + '.';
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "加载App信息出错");
                                   });

                                   $scope.appNamespace = {
                                       appId:$scope.appId,
                                       name:'',
                                       comment:''
                                   };

                                   $scope.concatNamespace = function() {
                                       if (!$scope.appBaseInfo) {
                                           return '';
                                       }
                                       return $scope.appBaseInfo.namespacePrefix +
                                           ($scope.appNamespace.name ? $scope.appNamespace.name : '');
                                   };

                                   var selectedClusters = [];
                                   $scope.collectSelectedClusters = function (data) {
                                        selectedClusters = data;
                                   };
                                   $scope.createNamespace = function () {
                                       if ($scope.type == 'link'){
                                           if (selectedClusters.length == 0){
                                               toastr.warning("请选择集群");
                                               return;
                                           }

                                           if ($scope.namespaceType == 1){
                                               var selectedNamespaceName = $('#namespaces').select2('data')[0].id;
                                               if (!selectedNamespaceName) {
                                                   toastr.warning("请选择Namespace");
                                                   return;
                                               }

                                               $scope.namespaceName = selectedNamespaceName;
                                           }

                                           var namespaceCreationModels = [];
                                           selectedClusters.forEach(function (cluster) {
                                               namespaceCreationModels.push({
                                                                                env: cluster.env,
                                                                                namespace: {
                                                                                    appId: $scope.appId,
                                                                                    clusterName: cluster.clusterName,
                                                                                    namespaceName: $scope.namespaceName
                                                                                }
                                                                            });
                                           });
                                           NamespaceService.createNamespace($scope.appId, namespaceCreationModels)
                                               .then(function (result) {
                                                   toastr.success("创建成功");
                                                   $scope.step = 2;
                                               }, function (result) {
                                                   toastr.error(AppUtil.errorMsg(result));
                                               });
                                       }else {
                                           NamespaceService.createAppNamespace($scope.appId, $scope.appNamespace).then(function (result) {
                                               $scope.step = 2;
                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "创建失败");
                                           });
                                       }

                                   };

                                   $scope.namespaceType = 1;
                                   $scope.selectNamespaceType = function (type) {
                                       $scope.namespaceType = type;
                                   };

                                   $scope.back = function () {
                                       $window.location.href = '/config.html?#appid=' + $scope.appId;
                                   };
                               }]);

