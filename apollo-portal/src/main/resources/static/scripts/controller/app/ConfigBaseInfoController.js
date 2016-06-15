application_module.controller("ConfigBaseInfoController",
                              ['$rootScope', '$scope', '$location', 'toastr', 'AppService', 'PermissionService',
                               'AppUtil',
                               function ($rootScope, $scope, $location, toastr, AppService, PermissionService,
                                         AppUtil) {

                                   var appId = AppUtil.parseParams($location.$$url).appid;
                                   var pageContext = {
                                       appId: appId,
                                       env: '',
                                       clusterName: 'default'
                                   };

                                   $rootScope.pageContext = pageContext;

                                   ////// load cluster nav tree //////

                                   AppService.load_nav_tree($rootScope.pageContext.appId).then(function (result) {
                                       var navTree = [];
                                       var nodes = AppUtil.collectData(result);

                                       if (!nodes || nodes.length == 0){
                                           toastr.error("加载导航信息出错");
                                           return;
                                       }
                                       //默认显示第一个环境的default集群的
                                       pageContext.env = nodes[0].env;
                                       $rootScope.refreshNamespaces();

                                       nodes.forEach(function (env, envIdx) {
                                           if (!env.clusters || env.clusters.length == 0) {
                                               return;
                                           }
                                           var node = {};
                                           //first nav
                                           node.text = env.env;
                                           var clusterNodes = [];

                                           //如果env下面只有一个default集群则不显示集群列表
                                           if (env.clusters && env.clusters.length == 1 && env.clusters[0].name
                                                                                             == 'default') {
                                               if (envIdx == 0){
                                                   node.state = {};
                                                   node.state.selected = true;
                                               }
                                               node.selectable = true;
                                           } else {
                                               node.selectable = false;
                                               //second nav
                                               env.clusters.forEach(function (cluster, clusterIdx) {
                                                   var clusterNode = {},
                                                       parentNode = [];

                                                   if (envIdx == 0 && clusterIdx == 0){
                                                       clusterNode.state = {};
                                                       clusterNode.state.selected = true;
                                                   }

                                                   clusterNode.text = cluster.name;
                                                   parentNode.push(node.text);
                                                   clusterNode.tags = parentNode;
                                                   clusterNodes.push(clusterNode);
                                               });
                                           }
                                           node.nodes = clusterNodes;
                                           navTree.push(node);
                                       });

                                       $('#treeview').treeview({
                                                                   color: "#797979",
                                                                   showBorder: true,
                                                                   data: navTree,
                                                                   levels: 99,
                                                                   expandIcon: '',
                                                                   collapseIcon: '',
                                                                   onNodeSelected: function (event, data) {
                                                                       if (!data.tags) {//first nav node
                                                                           $rootScope.pageContext.env = data.text;
                                                                           $rootScope.pageContext.clusterName =
                                                                               'default';
                                                                       } else {//second cluster node
                                                                           $rootScope.pageContext.env = data.tags[0];
                                                                           $rootScope.pageContext.clusterName =
                                                                               data.text;
                                                                       }
                                                                       $rootScope.refreshNamespaces();
                                                                   }
                                                               });

                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "加载导航出错");
                                   });

                                   ////// app info //////

                                   AppService.load($rootScope.pageContext.appId).then(function (result) {
                                       $scope.appBaseInfo = result;
                                   }, function (result) {
                                       toastr.error(AppUtil.errorMsg(result), "加载App信息出错");
                                   });

                                   ////// 补缺失的环境 //////
                                   $scope.missEnvs = [];
                                   AppService.find_miss_envs($rootScope.pageContext.appId).then(function (result) {
                                       $scope.missEnvs = AppUtil.collectData(result);
                                   }, function (result) {
                                       console.log(AppUtil.errorMsg(result));
                                   });

                                   $scope.createAppInMissEnv = function () {
                                       var count = 0;
                                       $scope.missEnvs.forEach(function (env) {
                                           AppService.create_remote(env, $scope.appBaseInfo).then(function (result) {
                                               toastr.success(env, '创建成功');
                                               count++;
                                               if (count == $scope.missEnvs.length) {
                                                   location.reload(true);
                                               }
                                           }, function (result) {
                                               toastr.error(AppUtil.errorMsg(result), '创建失败:' + env);
                                               count++;
                                               if (count == $scope.missEnvs.length) {
                                                   location.reload(true);
                                               }
                                           });
                                       });
                                   };

                                   //permission
                                   PermissionService.has_create_namespace_permission(appId).then(function (result) {
                                       $scope.hasCreateNamespacePermission = result.hasPermission;
                                   }, function (result) {
                                       
                                   });
                                   PermissionService.has_assign_user_permission(appId).then(function (result) {
                                       $scope.hasAssignUserPermission = result.hasPermission;
                                   }, function (result) {

                                   });

                               }]);

