index_module.controller('IndexController', ['$scope', '$window', 'toastr', 'AppService', 'AppUtil', 'EnvService',
        function ($scope, $window, toastr, AppService, AppUtil, EnvService) {

            $scope.envs = [];
            $scope.selectedEnv = '';
            EnvService.find_all_envs().then(function (result) {
                $scope.envs = result;
                //default select first env
                $scope.switchEnv($scope.envs[0]);
            }, function (result) {
                    toastr.error(AppUtil.errorMsg(result), "load env error");
            });

            var apps = [];
       
            $scope.switchEnv = function (env) {
                $scope.selectedEnv = env;
                loadApps(env);
            };
            
            function loadApps(env){
                AppService.find_all_app(env).then(function (result) {
                    apps = result;
                    $scope.apps = apps;
                    $scope.appsCount = apps.length;
                    $scope.selectedEnv = env;
                }, function (result) {
                    toastr.error(AppUtil.errorMsg(result), "load apps error"); 
                });    
            };
            

            $scope.search = function () {
                    var key = $scope.searchKey;
                    if (key == '') {
                            $scope.apps = apps;
                            return;
                    }
                    var result = [];
                    apps.forEach(function (item) {
                            if (item.appId.indexOf(key) >= 0 || item.name.indexOf(key) >= 0) {
                                    result.push(item);
                            }
                    });

                    $scope.apps = result;
            };

        }]);
