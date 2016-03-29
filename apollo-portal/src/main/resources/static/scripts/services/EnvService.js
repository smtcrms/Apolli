appService.service('EnvService', ['$resource', '$q', function ($resource, $q) {
    var env_resource = $resource('/envs', {}, {
        all: {
            method: 'GET',
            isArray: true
        }
    });
    return {
        getAllEnvs: function getAllEnvs() {
            var d = $q.defer();
            env_resource.all({}, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        }
    }
}]);
