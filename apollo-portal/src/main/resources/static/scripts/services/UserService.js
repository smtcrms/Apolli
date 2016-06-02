appService.service('UserService', ['$resource', '$q', function ($resource, $q) {
    var user_resource = $resource('', {}, {
        load_user:{
            method: 'GET',
            url:'/user'
        }
    });
    return {
        load_user: function () {
            var d = $q.defer();
            user_resource.load_user({
                                    },
                                    function (result) {
                                        d.resolve(result);
                                    }, function (result) {
                    d.reject(result);
                });
            return d.promise;
        }
    }
}]);
