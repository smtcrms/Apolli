appService.service("ConfigService", ['$resource', '$q', function ($resource, $q) {
    var config_source = $resource("", {}, {
        load_all_groups: {
            method:'GET',
            isArray: true,
            url:'/apps/:appId/env/:env/clusters/:clusterName/namespaces'
        }
    });

    return {
        load_all_namespaces: function (appId, env, clusterName) {
            var d = $q.defer();
            config_source.load_all_groups({
                appId: appId,
                env: env,
                clusterName: clusterName
            }, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        }
    }

}]);
