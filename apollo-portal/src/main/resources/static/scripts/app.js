/**service module 定义*/
var appService = angular.module('app.service', ['ngResource']);

/** page module 定义*/
// 首页
var index_module = angular.module('index', ['toastr', 'app.service', 'angular-loading-bar']);
//项目主页
var application_module = angular.module('application', ['app.service', 'toastr', 'angular-loading-bar']);
//创建项目页面
var create_app_module = angular.module('create_app', ['ngResource', 'toastr', 'app.service', 'angular-loading-bar']);






