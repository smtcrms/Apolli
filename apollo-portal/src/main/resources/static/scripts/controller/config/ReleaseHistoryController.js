release_history_module.controller("ReleaseHistoryController",
                                  ['$scope', '$location', '$anchorScroll', '$window', 'toastr', 'AppService', 'AppUtil',
                                   'ReleaseService',
                                   function ($scope, $location, $anchorScroll, $window, toastr, AppService, AppUtil, ReleaseService) {

                                       var params = AppUtil.parseParams($location.$$url);
                                       $scope.pageContext = {
                                           appId: params.appid,
                                           env: params.env,
                                           clusterName: params.clusterName,
                                           namespaceName: params.namespaceName,
                                           scrollTo: params.scrollTo
                                       };

                                       $scope.page = 0;
                                       $scope.releases = [];
                                       $scope.hasLoadAll = false;

                                       $scope.findReleases = findReleases;

                                       $scope.loadMore = loadMore;

                                       findReleases($scope.page);

                                       var hasFindActiveRelease = false;
                                       function findReleases(page) {
                                           var size = 10;
                                           ReleaseService.findAllRelease($scope.pageContext.appId,
                                                                         $scope.pageContext.env,
                                                                         $scope.pageContext.clusterName,
                                                                         $scope.pageContext.namespaceName,
                                                                         page,
                                                                         size)
                                               .then(function (result) {
                                                   if (!result || result.length < size) {
                                                       $scope.hasLoadAll = true;
                                                   }

                                                   var hasParseNamespaceType = false;

                                                   result.forEach(function (release) {
                                                       if (!hasParseNamespaceType) {
                                                           $scope.isTextFile =
                                                               /\.(json|yaml|yml|xml)$/gi.test(
                                                                   release.baseInfo.namespaceName);
                                                           hasParseNamespaceType = true;
                                                       }
                                                       if (!hasFindActiveRelease && !release.baseInfo.isAbandoned) {
                                                           release.active = true;
                                                           hasFindActiveRelease = true;
                                                       }
                                                       $scope.releases.push(release);
                                                   })


                                                   if ($scope.pageContext.scrollTo){
                                                       $location.hash($scope.pageContext.scrollTo);
                                                       $anchorScroll();
                                                   }
                                               }, function (result) {
                                                   toastr.error(AppUtil.errorMsg(result));
                                               });
                                       }

                                       function loadMore() {
                                           $scope.page += 1;
                                           findReleases($scope.page);
                                       }

                                   }]);

