/**service module 定义*/
var appService = angular.module('app.service', ['ngResource']);

/** page module 定义*/
//项目主页
var application_module = angular.module('application', ['ngResource','ui.router', 'app.service', 'toastr', 'angular-loading-bar']);
//创建项目页面
var create_app_module = angular.module('create_app', ['ngResource', 'toastr', 'app.service', 'angular-loading-bar']);






