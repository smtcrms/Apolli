appService.service("NamespaceService", ['$resource', '$q', function ($resource, $q) {
    var namespace_source = $resource("", {}, {
        find_public_namespaces: {
            method: 'GET',
            isArray: true,
            url: '/appnamespaces/public'
        },
        save: {
            method: 'POST',
            url: '/apps/:appId/envs/:env/clusters/:clusterName/namespaces',
            isArray: false
        }
    });

    return {
        find_public_namespaces: function () {
            var d = $q.defer();
            namespace_source.find_public_namespaces({}, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        },
        save: function (appId, env, clusterName, namespaceName) {
            var d = $q.defer();
            namespace_source.save({
                                      appId: appId,
                                      env: env,
                                      clusterName: clusterName
                                  }, {
                                      appId: appId,
                                      clusterName: clusterName,
                                      namespaceName: namespaceName
                                  }, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        }
    }

}]);
