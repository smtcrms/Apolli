create_app_module.controller('CreateAppController', ['$scope', '$window', 'toastr', 'AppService',
    function ($scope, $window, toastr, AppService) {

        $scope.save = function () {
            AppService.add($scope.app).then(function (result) {
                toastr.success('添加成功!');
                setInterval(function () {
                    $window.location.href = '/views/app.html?#appid=' + result.appId;
                }, 1000);
            }, function (result) {
                if (result.status == 400){
                    toastr.error('params error','添加失败!');
                }else {
                    toastr.error('server error','添加失败!');
                }
            });
        };

    }]);
