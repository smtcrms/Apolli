appService.service('AppService', ['$resource', '$q', function ($resource, $q) {
    var app_resource = $resource('/apps/:appId', {}, {
        find_all_app:{
            method: 'GET',
            isArray: true,
            url:'/apps'
        },
        load_navtree:{
            methode: 'GET',
            isArray:false,
            url:'/apps/:appId/navtree'
        },
        load_app: {
            method: 'GET',
            isArray: false
        },
        create_app: {
            method: 'POST',
            url: '/apps'
        },
        create_app_remote: {
            method: 'POST',
            url: '/apps/envs/:env'
        },
        find_miss_envs: {
            method: 'GET',
            url: '/apps/:appId/miss_envs'
        }
    });
    return {
        find_all_app: function () {
            var d = $q.defer();
            app_resource.find_all_app({
                                      
                                      }, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        },
        load_nav_tree: function (appId){
            var d = $q.defer();
            app_resource.load_navtree({
                appId: appId
            }, function(result){
                d.resolve(result);
            }, function(result){
                d.reject(result);
            });
            return d.promise;
        },
        create: function (app) {
            var d = $q.defer();
            app_resource.create_app({}, app, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        },
        create_remote: function (env, app) {
            var d = $q.defer();
            app_resource.create_app_remote({env:env}, app, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        },
        load: function (appId) {
            var d = $q.defer();
            app_resource.load_app({
                appId: appId
            }, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        },
        find_miss_envs: function (appId) {
            var d = $q.defer();
            app_resource.find_miss_envs({
                appId: appId
                                        }, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        }
    }
}]);
