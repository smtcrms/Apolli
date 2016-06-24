cluster_module.controller('ClusterController',
                          ['$scope', '$location', '$window', 'toastr', 'AppService', 'EnvService', 'ClusterService',
                           'AppUtil',
                           function ($scope, $location, $window, toastr, AppService, EnvService, ClusterService,
                                     AppUtil) {

                               var params = AppUtil.parseParams($location.$$url);
                               $scope.appId = params.appid;

                               EnvService.find_all_envs().then(function (result) {
                                   $scope.envs = [];
                                   result.forEach(function (env) {
                                       $scope.envs.push({name: env, checked: false});

                                   })
                               }, function (result) {
                                   toastr.error(AppUtil.errorMsg(result), "加载环境信息出错");
                               });

                               $scope.clusterName = '';

                               $scope.switchChecked = function (env) {
                                   env.checked = !env.checked;
                               };

                               $scope.create = function () {
                                   var noEnvChecked = true;
                                   $scope.envs.forEach(function (env) {
                                       if (env.checked) {
                                           noEnvChecked = false;
                                           ClusterService.create_cluster($scope.appId, env.name,
                                                                         {
                                                                             name: $scope.clusterName,
                                                                             appId: $scope.appId
                                                                         }).then(function (result) {
                                               toastr.success(env.name, "集群创建成功");
                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), "集群创建失败");
                                           })
                                       }
                                   })

                                   if (noEnvChecked){
                                       toastr.warning("请选择环境");
                                   }

                               };

                           }]);
