appService.service('ReleaseService', ['$resource', '$q', function ($resource, $q) {
    var resource = $resource('', {}, {
        find_releases: {
            method: 'GET',
            url: '/apps/:appId/envs/:env/clusters/:clusterName/namespaces/:namespaceName/releases',
            isArray: true
        },
        release: {
            method: 'POST',
            url: '/apps/:appId/envs/:env/clusters/:clusterName/namespaces/:namespaceName/release'
        }
    });

    function createRelease(appId, env, clusterName, namespaceName, releaseBy, comment) {
        var d = $q.defer();
        resource.release({
                             appId: appId,
                             env: env,
                             clusterName: clusterName,
                             namespaceName: namespaceName
                         }, {
                             releaseBy: releaseBy,
                             releaseComment: comment
                         }, function (result) {
            d.resolve(result);
        }, function (result) {
            d.reject(result);
        });
        return d.promise;
    }

    function findReleases(appId, env, clusterName, namespaceName, page) {
        var d = $q.defer();
        resource.find_releases({
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

    return {
        release: createRelease,
        findRelease: findReleases
    }
}]);
