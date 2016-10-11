index_module.controller('IndexController', ['$scope', '$window', 'toastr', 'AppUtil', 'AppService',
                                            'UserService', 'FavoriteService',
                                            IndexController]);

function IndexController($scope, $window, toastr, AppUtil, AppService, UserService, FavoriteService) {

    $scope.userId = '';

    $scope.getUserCreatedApps = getUserCreatedApps;
    $scope.getUserFavorites = getUserFavorites;
    $scope.addFavorite = addFavorite;

    $scope.goToAppHomePage = goToAppHomePage;
    $scope.goToCreateAppPage = goToCreateAppPage;
    $scope.toggleOperationBtn = toggleOperationBtn;
    $scope.toTop = toTop;
    $scope.deleteFavorite = deleteFavorite;

    UserService.load_user().then(function (result) {
        $scope.userId = result.userId;

        $scope.createdAppPage = 0;
        $scope.createdApps = [];
        $scope.hasMoreCreatedApps = true;
        $scope.favoritesPage = 0;
        $scope.favorites = [];
        $scope.hasMoreFavorites = true;
        $scope.visitedApps = [];

        getUserCreatedApps();

        getUserFavorites();

        initUserVisitedApps();
    });

    function getUserCreatedApps() {
        var size = 10;
        AppService.find_app_by_owner($scope.userId, $scope.createdAppPage, size)
            .then(function (result) {
                $scope.createdAppPage += 1;
                $scope.hasMoreCreatedApps = result.length == size;

                if (!result || result.length == 0) {
                    return;
                }
                result.forEach(function (app) {
                    $scope.createdApps.push(app);
                });

            })
    }

    function getUserFavorites() {
        var size = 11;
        FavoriteService.findFavorites($scope.userId, '', $scope.favoritesPage, size)
            .then(function (result) {
                $scope.favoritesPage += 1;
                $scope.hasMoreFavorites = result.length == size;

                if (!result || result.length == 0) {
                    return;
                }
                var appIds = [];
                result.forEach(function (favorite) {
                    appIds.push(favorite.appId);

                });

                AppService.find_apps(appIds.join(","))
                    .then(function (apps) {
                        //sort
                        var appIdMapApp = {};
                        apps.forEach(function (app) {
                            appIdMapApp[app.appId] = app;
                        });
                        result.forEach(function (favorite) {
                            var app = appIdMapApp[favorite.appId];
                            app.favoriteId = favorite.id;
                            $scope.favorites.push(app);
                        });
                    });
            })
    }

    function initUserVisitedApps() {
        var VISITED_APPS_STORAGE_KEY = "VisitedAppsV2";
        var visitedAppsObject = JSON.parse(localStorage.getItem(VISITED_APPS_STORAGE_KEY));
        if (!visitedAppsObject) {
            visitedAppsObject = {};
        }

        var userVisitedApps = visitedAppsObject[$scope.userId];
        if (userVisitedApps && userVisitedApps.length > 0) {
            AppService.find_apps(userVisitedApps.join(","))
                .then(function (apps) {
                    apps.forEach(function (app) {
                        $scope.visitedApps.push(app);
                    });
                });
        }

    }

    function addFavorite(appId) {
        var favorite = {
            userId: $scope.userId,
            appId: appId
        };

        FavoriteService.addFavorite(favorite)
            .then(function (result) {
                $scope.favoriteId = result.id;
                toastr.success("收藏成功");
                reload();
            }, function (result) {
                toastr.error(AppUtil.errorMsg(result), "收藏失败");
            })
    };

    function goToCreateAppPage() {
        $window.location.href = "/app.html";
    }

    function goToAppHomePage(appId) {
        $window.location.href = "/config.html?#/appid=" + appId;
    }

    function toggleOperationBtn(app) {
        app.showOperationBtn = !app.showOperationBtn;
    }

    function toTop(favoriteId) {
        FavoriteService.toTop(favoriteId).then(function () {
            toastr.success("置顶成功");
            reload();

        })
    }

    function deleteFavorite(favoriteId) {
        FavoriteService.deleteFavorite(favoriteId).then(function () {
            toastr.success("取消收藏成功");
            reload();
        })
    }

    function reload() {
        setTimeout(function () {
            $window.location.reload();
        }, 500);

    }

}
