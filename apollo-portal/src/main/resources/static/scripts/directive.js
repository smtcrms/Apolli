
/** navbar */
directive_module.directive('apollonav', function ($compile, $window, AppService, EnvService) {
    return {
        restrict: 'E',
        templateUrl: '../views/common/nav.html',
        transclude: true,
        replace: true,
        link: function (scope, element, attrs) {

            scope.sourceApps = [];
            scope.copyedApps = [];
            
            EnvService.find_all_envs().then(function (result) {
                //default select first env
                AppService.find_all_app(result[0]).then(function (result) {
                    result.forEach(function (app) {
                        app.selected = false;
                        scope.sourceApps.push(app);
                    });
                    scope.copyedApps = angular.copy(scope.sourceApps);
                }, function (result) {
                    toastr.error(AppUtil.errorMsg(result), "load apps error");
                });
            }, function (result) {
                toastr.error(AppUtil.errorMsg(result), "load env error");
            });

            scope.searchKey = '';
            scope.shouldShowAppList = false;
            var selectedApp = {};
            scope.selectApp = function (app) {
                select(app);
            };

            scope.changeSearchKey = function () {
                scope.copyedApps = [];
                    scope.sourceApps.forEach(function (app) {
                        if (app.name.indexOf(scope.searchKey) > -1 || app.appId.indexOf(scope.searchKey) > -1) {
                            scope.copyedApps.push(app);
                        }
                    });
                scope.shouldShowAppList = true;
            };
            
            scope.jumpToConfigPage = function () {
                if (selectedApp.appId){
                    var needReloadPage = false;
                    if ($window.location.href.indexOf("config.html") > -1){
                        needReloadPage = true;
                    }
                    $window.location.href = '/config.html?#appid=' + selectedApp.appId;

                    if (needReloadPage){
                        $window.location.reload();
                    }
                }
            };

            //up:38 down:40 enter:13
            var selectedAppIdx = -1;
            element.bind("keydown keypress", function (event) {

                if (event.keyCode == 40) {
                    if (selectedAppIdx < scope.copyedApps.length - 1) {
                        clearAppsSelectedStatus();
                        scope.copyedApps[++selectedAppIdx].selected = true;
                    }
                } else if (event.keyCode == 38) {
                    if (selectedAppIdx >= 1) {
                        clearAppsSelectedStatus();
                        scope.copyedApps[--selectedAppIdx].selected = true;
                    }
                } else if (event.keyCode == 13) {
                    if (scope.shouldShowAppList && selectedAppIdx > -1){
                        select(scope.copyedApps[selectedAppIdx]);
                        event.preventDefault();
                    }else {
                        scope.jumpToConfigPage();
                    }

                }
                //强制刷新
                scope.$apply(function () {
                    scope.copyedApps = scope.copyedApps;
                });
            });

            $(".search-input").on("click", function (event) {
                event.stopPropagation();
            });

            $(document).on('click', function () {
                scope.$apply(function () {
                    scope.shouldShowAppList = false;
                });
            });

            function clearAppsSelectedStatus() {
                scope.copyedApps.forEach(function (app) {
                    app.selected = false;
                })

            }

            function select(app) {
                selectedApp = app;
                scope.searchKey = app.name;
                scope.shouldShowAppList = false;
                clearAppsSelectedStatus();
                selectedAppIdx = -1;

            }
        }
    }

});

/** env cluster selector*/

directive_module.directive('apolloclusterselector', function ($compile, $window, AppService, AppUtil, toastr) {
    return {
        restrict: 'E',
        templateUrl: '../views/component/env-selector.html',
        transclude: true,
        replace: true,
        scope: {
            appId: '=apolloAppId',
            defaultChecked: '=apolloDefaultChecked',
            select: '=apolloSelect'
        },
        link: function (scope, element, attrs) {
            ////// load env //////
            AppService.load_nav_tree(scope.appId).then(function (result) {
                scope.clusters = [];
                var envClusterInfo = AppUtil.collectData(result);
                envClusterInfo.forEach(function (node) {
                    var env = node.env;
                    node.clusters.forEach(function (cluster) {
                        cluster.env = env;
                        cluster.checked = scope.defaultChecked;
                        scope.clusters.push(cluster);
                    })
                });
                scope.select(collectSelectedClusters());
            }, function (result) {
                toastr.error(AppUtil.errorMsg(result), "加载环境信息出错");
            });

            scope.envAllSelected = scope.defaultChecked;

            scope.toggleEnvsCheckedStatus = function () {
                scope.envAllSelected = !scope.envAllSelected;
                scope.clusters.forEach(function (cluster) {
                    cluster.checked = scope.envAllSelected;
                });
                scope.select(collectSelectedClusters());
            };

            scope.switchSelect = function (o) {
                o.checked = !o.checked;
                scope.select(collectSelectedClusters());
            };

            function collectSelectedClusters() {
                var selectedClusters = [];
                scope.clusters.forEach(function (cluster) {
                    if (cluster.checked){
                        cluster.clusterName = cluster.name;
                        selectedClusters.push(cluster);
                    }
                });
                return selectedClusters;
            }
            
        }
    }

});
