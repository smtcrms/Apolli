create_app_module.controller('CreateAppController', ['$scope', '$window', 'toastr', 'AppService', 'AppUtil',
    function ($scope, $window, toastr, AppService, AppUtil) {

        $scope.create = function () {
            AppService.create($scope.app).then(function (result) {
                toastr.success('添加成功!');
                setInterval(function () {
                    $window.location.href = '/config.html?#appid=' + result.appId;
                }, 1000);
            }, function (result) {
                toastr.error(AppUtil.errorMsg(result), '添加失败!');
            });
        };

    }]);
