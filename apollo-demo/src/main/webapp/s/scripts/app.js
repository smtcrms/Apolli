(function ($) {
    var app = angular.module('Demo', [
        'ui.bootstrap',
        'toastr',
        'angular-loading-bar',
        'httpInterceptors' //custom http interceptor
    ]);

    app.controller('DemoController', function ($scope, $http, $modal, toastr) {
        //var NONE = "none";

        this.registries = {};
        this.configQuery = {};
        //this.refreshResult = NONE;

        var self = this;

        this.loadRegistries = function() {
            $http.get("demo/client/registries")
                .success(function (data) {
                    self.registries = data;
                })
                .error(function (data, status) {
                    toastr.error((data && data.msg) || 'Loading registries failed');
                });
        };

        this.queryConfig = function() {
            $http.get("demo/config/" + encodeURIComponent(this.configQuery.configName))
                .success(function(data) {
                    self.configQuery.configValue = data.value;
                })
                .error(function(data, status) {
                    toastr.error((data && data.msg) || 'Load config failed');
                });
        };

        //this.refreshConfig = function() {
        //    $http.post("refresh")
        //        .success(function(data) {
        //            self.assembleRefreshResult(data);
        //        })
        //        .error(function(data, status) {
        //            toastr.error((data && data.msg) || 'Refresh config failed');
        //        });
        //
        //};

        //this.assembleRefreshResult = function(changedPropertyArray) {
        //    if(!changedPropertyArray || !changedPropertyArray.length) {
        //        this.refreshResult = NONE;
        //        return;
        //    }
        //    this.refreshResult = changedPropertyArray.join(',');
        //};

        this.loadRegistries();

    });

})(jQuery);
