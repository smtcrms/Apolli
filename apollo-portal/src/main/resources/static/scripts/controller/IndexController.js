index_module.controller('IndexController', ['$scope', '$window', 'toastr', 'AppService',
        function ($scope, $window, toastr, AppService) {

                $scope.env = 'LOCAL';

                var apps = [];
                AppService.find_all_app($scope.env).then(function (result) {
                        apps = result;
                        $scope.apps = apps;
                });

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
