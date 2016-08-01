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



            $scope.switchEnv = function (env) {
                $scope.selectedEnv = env;
                loadApps(env);
            };

            var sourceApps = [];

            function loadApps(env){
                AppService.find_all_app(env).then(function (result) {
                    sourceApps = sortApps(result);
                    $scope.apps = sourceApps;
                    $scope.appsCount = sourceApps.length;
                    $scope.selectedEnv = env;
                }, function (result) {
                    toastr.error(AppUtil.errorMsg(result), "load apps error");
                });
            }

            var VISITED_APPS_STORAGE_KEY = "VisitedApps";
            //访问过的App放在列表最前面,方便用户选择
            function sortApps(sourceApps) {
                var visitedApps = JSON.parse(localStorage.getItem(VISITED_APPS_STORAGE_KEY));
                if (!visitedApps){
                    return;
                }
                var existedVisitedAppsMap = {};
                visitedApps.forEach(function (app) {
                    existedVisitedAppsMap[app] = true;
                });

                var sortedApps = [];
                sourceApps.forEach(function (app) {
                    if (existedVisitedAppsMap[app.appId]){
                        sortedApps.push(app);
                    }
                });
                sourceApps.forEach(function (app) {
                    if (!existedVisitedAppsMap[app.appId]){
                        sortedApps.push(app);
                    }
                });
                return sortedApps;
            }

            $scope.search = function () {
                    var key = $scope.searchKey.toLocaleLowerCase();
                    if (key == '') {
                            $scope.apps = sourceApps;
                            return;
                    }
                    var result = [];
                    sourceApps.forEach(function (item) {
                            if (item.appId.toLocaleLowerCase().indexOf(key) >= 0 ||
                                item.name.toLocaleLowerCase().indexOf(key) >= 0) {
                                    result.push(item);
                            }
                    });

                    $scope.apps = result;
            };

        }]);
