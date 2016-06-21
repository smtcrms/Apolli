role_module.controller('NamespaceRoleController',
                       ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil', 'PermissionService',
                        function ($scope, $location, $window, toastr, AppService, AppUtil, PermissionService) {

                            var params = AppUtil.parseParams($location.$$url);
                            $scope.pageContext = {
                                appId: params.appid,
                                namespaceName: params.namespaceName
                            };

                            PermissionService.has_assign_user_permission($scope.pageContext.appId)
                                .then(function (result) {
                                    $scope.hasAssignUserPermission = result.hasPermission;
                                }, function (reslt) {

                                });

                            PermissionService.get_namespace_role_users($scope.pageContext.appId,
                                                                       $scope.pageContext.namespaceName)
                                .then(function (result) {
                                    $scope.rolesAssignedUsers = result;
                                    console.log(result);
                                }, function (result) {
                                    toastr.error(AppUtil.errorMsg(result), "加载授权用户出错");
                                });

                            $scope.toAssignReleaseNamespaceRoleUser = '', $scope.toAssignModifyNamespaceRoleUser = '';

                            $scope.assignRoleToUser = function (roleType) {
                                if ('ReleaseNamespace' == roleType) {
                                    PermissionService.assign_release_namespace_role($scope.pageContext.appId,
                                                                                    $scope.pageContext.namespaceName,
                                                                                    $scope.toAssignReleaseNamespaceRoleUser)
                                        .then(function (result) {
                                            toastr.success("添加成功");
                                            $scope.rolesAssignedUsers.releaseRoleUsers.push({userId: $scope.toAssignReleaseNamespaceRoleUser});
                                        }, function (result) {
                                            toastr.error(AppUtil.errorMsg(result), "添加失败");
                                        });
                                } else {
                                    PermissionService.assign_modify_namespace_role($scope.pageContext.appId,
                                                                                   $scope.pageContext.namespaceName,
                                                                                   $scope.toAssignModifyNamespaceRoleUser)
                                        .then(function (result) {
                                            toastr.success("添加成功");
                                            $scope.rolesAssignedUsers.modifyRoleUsers.push({userId: $scope.toAssignModifyNamespaceRoleUser});
                                        }, function (result) {
                                            toastr.error(AppUtil.errorMsg(result), "添加失败");
                                        });
                                }
                            };

                            $scope.removeUserRole = function (roleType, user) {
                                if ('ReleaseNamespace' == roleType) {
                                    PermissionService.remove_release_namespace_role($scope.pageContext.appId,
                                                                                    $scope.pageContext.namespaceName,
                                                                                    user)
                                        .then(function (result) {
                                            toastr.success("删除成功");
                                            removeUserFromList($scope.rolesAssignedUsers.releaseRoleUsers, user);
                                        }, function (result) {
                                            toastr.error(AppUtil.errorMsg(result), "删除失败");
                                        });
                                } else {
                                    PermissionService.remove_modify_namespace_role($scope.pageContext.appId,
                                                                                   $scope.pageContext.namespaceName,
                                                                                   user)
                                        .then(function (result) {
                                            toastr.success("删除成功");
                                            removeUserFromList($scope.rolesAssignedUsers.modifyRoleUsers, user);
                                        }, function (result) {
                                            toastr.error(AppUtil.errorMsg(result), "删除失败");
                                        });
                                }
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
