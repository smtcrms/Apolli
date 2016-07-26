appService.service('ReleaseService', ['$resource', '$q', function ($resource, $q) {
    var resource = $resource('', {}, {
        find_all_releases: {
            method: 'GET',
            url: '/apps/:appId/envs/:env/clusters/:clusterName/namespaces/:namespaceName/releases/all',
            isArray: true
        },
        find_active_releases: {
            method: 'GET',
            url: '/apps/:appId/envs/:env/clusters/:clusterName/namespaces/:namespaceName/releases/active',
            isArray: true
        },
        compare: {
            method: 'GET',
            url: '/envs/:env/releases/compare'
        },
        release: {
            method: 'POST',
            url: '/apps/:appId/envs/:env/clusters/:clusterName/namespaces/:namespaceName/release'
        },
        rollback: {
            method: 'PUT',
            url: "envs/:env/releases/:releaseId/rollback"
        }
    });

    function createRelease(appId, env, clusterName, namespaceName, releaseTitle, comment) {
        var d = $q.defer();
        resource.release({
                             appId: appId,
                             env: env,
                             clusterName: clusterName,
                             namespaceName: namespaceName
                         }, {
                             releaseTitle: releaseTitle,
                             releaseComment: comment
                         }, function (result) {
            d.resolve(result);
        }, function (result) {
            d.reject(result);
        });
        return d.promise;
    }

    function findAllReleases(appId, env, clusterName, namespaceName, page) {
        var d = $q.defer();
        resource.find_all_releases({
                                       appId: appId,
                                       env: env,
                                       clusterName: clusterName,
                                       namespaceName: namespaceName,
                                       page: page
                                   }, function (result) {
            d.resolve(result);
        }, function (result) {
            d.reject(result);
        });
        return d.promise;
    }

    function findActiveReleases(appId, env, clusterName, namespaceName, page, size) {
        var d = $q.defer();
        resource.find_active_releases({
                                          appId: appId,
                                          env: env,
                                          clusterName: clusterName,
                                          namespaceName: namespaceName,
                                          page: page,
                                          size: size
                                      }, function (result) {
            d.resolve(result);
        }, function (result) {
            d.reject(result);
        });
        return d.promise;
    }

    function compare(env, firstReleaseId, secondReleaseId) {
        var d = $q.defer();
        resource.compare({
                             env: env,
                             firstReleaseId: firstReleaseId,
                             secondReleaseId: secondReleaseId
                         }, function (result) {
            d.resolve(result);
        }, function (result) {
            d.reject(result);
        });
        return d.promise;
    }

    function rollback(env, releaseId) {
        var d = $q.defer();
        resource.rollback({
                              env: env,
                              releaseId: releaseId
                          }, {}, function (result) {
                              d.resolve(result);
                          }, function (result) {
                              d.reject(result);
                          }
        );
        return d.promise;

    }

    return {
        release: createRelease,
        findAllRelease: findAllReleases,
        findActiveRelease: findActiveReleases,
        compare: compare,
        rollback: rollback
    }
}]);
