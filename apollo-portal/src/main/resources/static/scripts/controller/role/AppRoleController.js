role_module.controller('AppRoleController',
                       ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil', 'PermissionService',
                        function ($scope, $location, $window, toastr, AppService, AppUtil, PermissionService) {

                            var params = AppUtil.parseParams($location.$$url);
                            $scope.pageContext = {
                                appId: params.appid
                            };

                            $scope.userSelectWidgetId = 'toAssignMasterRoleUser';

                            PermissionService.has_assign_user_permission($scope.pageContext.appId)
                                .then(function (result) {
                                    $scope.hasAssignUserPermission = result.hasPermission;
                                }, function (reslt) {

                                });

                            PermissionService.get_app_role_users($scope.pageContext.appId)
                                .then(function (result) {
                                    $scope.appRoleUsers = result;
                                }, function (result) {

                                });


                            $scope.assignMasterRoleToUser = function () {
                                var toAssignMasterRoleUser = $('.' + $scope.userSelectWidgetId).select2('data')[0].id;
                                PermissionService.assign_master_role($scope.pageContext.appId,
                                                                     toAssignMasterRoleUser)
                                    .then(function (result) {
                                        toastr.success("添加成功");
                                        $scope.appRoleUsers.masterUsers.push({userId: toAssignMasterRoleUser});
                                    }, function (result) {
                                        toastr.error(AppUtil.errorMsg(result), "添加失败");
                                    });
                            };

                            $scope.removeMasterRoleFromUser = function (user) {
                                if ($scope.appRoleUsers.masterUsers.length <= 1) {
                                    $('#warning').modal('show');
                                    return;
                                }
                                PermissionService.remove_master_role($scope.pageContext.appId, user)
                                    .then(function (result) {
                                        toastr.success("删除成功");
                                        removeUserFromList($scope.appRoleUsers.masterUsers, user);
                                    }, function (result) {
                                        toastr.error(AppUtil.errorMsg(result), "删除失败");
                                    });
                            };

                            function removeUserFromList(list, user) {
                                var index = 0;
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].userId == user) {
                                        index = i;
                                        break;
                                    }
                                }
                                list.splice(index, 1);
                            }

                        }]);
