application_module.controller("AppInfoController", ["$scope", '$state', '$location', 'toastr', 'AppService',
    function ($scope, $state, $location, toastr, AppService) {
        $scope.appId = $location.$$url.split("=")[1];

        AppService.load($scope.appId).then(function (result) {
            $scope.app = result;
        }, function(result){
            toastr.error("加载出错");
        });

    }]);
