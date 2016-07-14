release_history_module.controller("ReleaseHistoryController",
                                  ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil',
                                   'ReleaseService',
                                   function ($scope, $location, $window, toastr, AppService, AppUtil, ReleaseService) {

                                       var params = AppUtil.parseParams($location.$$url);
                                       $scope.pageContext = {
                                           appId: params.appid,
                                           env: params.env,
                                           clusterName: params.clusterName,
                                           namespaceName: params.namespaceName
                                       };

                                       $scope.page = 0;
                                       $scope.releases = [];
                                       $scope.hasLoadAll = false;
                                       $scope.findReleases = findReleases;

                                       $scope.loadMore = loadMore;

                                       findReleases($scope.page);

                                       function findReleases(page) {
                                           ReleaseService.findRelease($scope.pageContext.appId,
                                                                      $scope.pageContext.env,
                                                                      $scope.pageContext.clusterName,
                                                                      $scope.pageContext.namespaceName,
                                                                      page)
                                               .then(function (result) {
                                                   if (!result || result.length == 0){
                                                       $scope.hasLoadAll = true;
                                                       return;
                                                   }

                                                   var hasParseNamepaceType = false;
                                                   result.forEach(function (release) {
                                                       if (!hasParseNamepaceType){
                                                           $scope.isTextFile = release.baseInfo.namespaceName.indexOf(".xml") > 0
                                                                                || release.baseInfo.namespaceName.indexOf(".json") > 0
                                                                                || release.baseInfo.namespaceName.indexOf(".yml") > 0
                                                                                || release.baseInfo.namespaceName.indexOf(".yaml") > 0;
                                                           hasParseNamepaceType = true;
                                                       }
                                                       $scope.releases.push(release);
                                                   })
                                               }, function (result) {
                                                   toastr.error(AppUtil.errorMsg(result));
                                               });
                                       }

                                       function loadMore() {
                                           $scope.page += 1;
                                           findReleases($scope.page);
                                       }

                                   }]);

