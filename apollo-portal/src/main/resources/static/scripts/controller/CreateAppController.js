create_app_module.controller('CreateAppController', ['$scope', '$window', 'toastr', 'AppService', 'AppUtil', 'OrganizationService',
    function ($scope, $window, toastr, AppService, AppUtil, OrganizationService) {

        OrganizationService.find_organizations().then(function (result) {
            var organizations = [];
            result.forEach(function (item) {
                var org = {};
                org.id = item.orgId;
                org.text = item.orgName + '(' + item.orgId + ')';
                org.name = item.orgName;
                organizations.push(org);
            });
            $('#organization').select2({
                placeholder: '请选择部门',
                width: '100%',
                data: organizations
            });
        }, function (result) {
            toastr.error(AppUtil.errorMsg(result), "load organizations error");
        });

        $scope.create = function () {
            var selectedOrg = $('#organization').select2('data')[0];

            if (!selectedOrg.id) {
                toastr.warning("请选择部门");
                return;
            }

            $scope.app.orgId = selectedOrg.id;
            $scope.app.orgName = selectedOrg.name;

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
