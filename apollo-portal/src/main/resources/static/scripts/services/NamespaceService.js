appService.service("NamespaceService", ['$resource', '$q', function ($resource, $q) {
    var namespace_source = $resource("", {}, {
        find_public_namespaces: {
            method: 'GET',
            isArray: true,
            url: '/appnamespaces/public'
        },
        createNamespace: {
            method: 'POST',
            url: '/apps/:appId/namespaces',
            isArray: false
        },
        createAppNamespace: {
            method: 'POST',
            url: '/apps/:appId/appnamespaces',
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
        createNamespace: function (appId, namespaceCreationModel) {
            var d = $q.defer();
            namespace_source.createNamespace({
                                                 appId: appId
                                             }, namespaceCreationModel, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        },
        createAppNamespace: function (appId, appnamespace) {
            var d = $q.defer();
            namespace_source.createAppNamespace({
                                      appId: appId
                                  }, appnamespace, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        }
    }

}]);
