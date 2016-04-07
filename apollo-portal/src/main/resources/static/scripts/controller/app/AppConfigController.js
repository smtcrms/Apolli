"use strict";
application_module.controller("AppConfigController",
                              ['$scope', '$location', 'toastr', 'NgTableParams', 'AppService', 'ConfigService',
                               function ($scope, $location, toastr, NgTableParams, AppService, ConfigService) {

                                   $scope.appId = $location.$$url.split("=")[1];

                                   /////////////

                                   AppService.load_nav_tree($scope.appId).then(function (result) {
                                       var navTree = [];
                                       var nodes = result.nodes;
                                       nodes.forEach(function (item) {
                                           var node = {};
                                           //first nav
                                           node.text = item.env;

                                           //second nav
                                           var clusterNodes = [];
                                           item.clusters.forEach(function (item) {
                                               var clusterNode = {};
                                               clusterNode.text = item.name;
                                               clusterNodes.push(clusterNode);
                                           });

                                           node.nodes = clusterNodes;
                                           navTree.push(node);
                                       });
                                       $('#treeview').treeview({
                                                                   color: "#428bca",
                                                                   showBorder: true,
                                                                   data: navTree,
                                                                   levels: 99
                                                               });
                                   }, function (result) {
                                       toastr.error("加载导航出错");
                                   });

                                   ///////////
                                   $scope.env = 'LOCAL';
                                   $scope.clusterName = 'DEFAULT';
                                   ConfigService.load_all_namespaces($scope.appId, $scope.env,
                                                                     $scope.clusterName).then(function (result) {

                                                                                              }, function (result) {
                                                                                                  toastr.error("加载配置信息出错");
                                                                                              });

                                   var simpleList = [{
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 5,
                                                         comment: '页面大小',
                                                         modified: "true",
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'ss',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     },
                                                     {
                                                         key: 'page',
                                                         value: 10,
                                                         comment: '页面大小',
                                                         dataChangeLastModifiedTime: '2016-02-23',
                                                         dataChangeLastModifiedBy: '网鱼'
                                                     }];

                                   function Namespace(data) {

                                       Namespace.prototype.data = data;
                                       Namespace.prototype.tableParams = new NgTableParams({
                                                                                               count: 9999
                                                                                           }, {
                                                                                               dataset: angular.copy(data)
                                                                                           });
                                       Namespace.prototype.deleteCount = 0;
                                       Namespace.prototype.isEditing = false;
                                       Namespace.prototype.isAdding = false;

                                       Namespace.prototype.add = function () {
                                           this.isEditing = true;
                                           this.isAdding = true;
                                           this.tableParams.settings().dataset.unshift({
                                                                                           name: "",
                                                                                           age: null,
                                                                                           money: null
                                                                                       });
                                           this.tableParams.sorting({});
                                           this.tableParams.page(1);
                                           this.tableParams.reload();
                                       };

                                       Namespace.prototype.cancelChanges = function () {
                                           this.resetTableStatus();
                                           var currentPage = this.tableParams.page();
                                           this.tableParams.settings({
                                                                         dataset: angular.copy(this.data)
                                                                     });
                                           // keep the user on the current page when we can
                                           if (!this.isAdding) {
                                               this.tableParams.page(currentPage);
                                           }
                                       };

                                       Namespace.prototype.del = function () {
                                           _.remove(this.tableParams.settings().dataset,
                                                    function (item) {
                                                        return row === item;
                                                    });
                                           this.deleteCount++;
                                           this.tableTracker.untrack(row);
                                           this.tableParams.reload().then(function (data) {
                                               if (data.length === 0 && this.tableParams.total() > 0) {
                                                   this.tableParams.page(this.tableParams.page() - 1);
                                                   this.tableParams.reload();
                                               }
                                           });
                                       };

                                       Namespace.prototype.hasChanges = function () {
                                           return this.tableForm.$dirty || this.deleteCount > 0
                                       };

                                       Namespace.prototype.saveChanges = function () {
                                           this.resetTableStatus();
                                           var currentPage = this.tableParams.page();
                                           this.data = angular.copy(this.tableParams.settings().dataset);
                                       };

                                       Namespace.prototype.resetTableStatus = function () {
                                           this.isEditing = false;
                                           this.isAdding = false;
                                           this.deleteCount = 0;
                                           this.tableTracker.reset();
                                           this.tableForm.$setPristine();
                                       }
                                   }

                                   var space = new Namespace(simpleList);
                                   $scope.cancelChanges = function () {
                                       space.cancelChanges();
                                   };

                                   $scope.space = space;
                               }]);

(function () {
    "use strict";

    application_module.run(configureDefaults);
    configureDefaults.$inject = ["ngTableDefaults"];

    function configureDefaults(ngTableDefaults) {
        ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];
    }
})();

/**********
 The following directives are necessary in order to track dirty state and validity of the rows
 in the table as the user pages within the grid
 ------------------------
 */


(function () {
    application_module.directive("trackedTable", trackedTable);

    trackedTable.$inject = [];

    function trackedTable() {
        return {
            restrict: "A",
            priority: -1,
            require: "ngForm",
            controller: trackedTableController
        };
    }

    trackedTableController.$inject = ["$attrs", "$element", "$parse", "$scope"];

    function trackedTableController($attrs, $element, $parse, $scope) {
        var self = this;
        var tableForm = $element.controller("form");
        var dirtyCellsByRow = [];
        var invalidCellsByRow = [];

        init();

        ////////

        function init() {
            var setter = $parse($attrs.trackedTable).assign;
            setter($scope, self);
            $scope.$on("$destroy", function () {
                setter(null);
            });

            self.reset = reset;
            self.isCellDirty = isCellDirty;
            self.setCellDirty = setCellDirty;
            self.setCellInvalid = setCellInvalid;
            self.untrack = untrack;
        }

        function getCellsForRow(row, cellsByRow) {
            return _.find(cellsByRow, function (entry) {
                return entry.row === row;
            })
        }

        function isCellDirty(row, cell) {
            var rowCells = getCellsForRow(row, dirtyCellsByRow);
            return rowCells && rowCells.cells.indexOf(cell) !== -1;
        }

        function reset() {
            dirtyCellsByRow = [];
            invalidCellsByRow = [];
            setInvalid(false);
        }

        function setCellDirty(row, cell, isDirty) {
            setCellStatus(row, cell, isDirty, dirtyCellsByRow);
        }

        function setCellInvalid(row, cell, isInvalid) {
            setCellStatus(row, cell, isInvalid, invalidCellsByRow);
            setInvalid(invalidCellsByRow.length > 0);
        }

        function setCellStatus(row, cell, value, cellsByRow) {
            var rowCells = getCellsForRow(row, cellsByRow);
            if (!rowCells && !value) {
                return;
            }

            if (value) {
                if (!rowCells) {
                    rowCells = {
                        row: row,
                        cells: []
                    };
                    cellsByRow.push(rowCells);
                }
                if (rowCells.cells.indexOf(cell) === -1) {
                    rowCells.cells.push(cell);
                }
            } else {
                _.remove(rowCells.cells, function (item) {
                    return cell === item;
                });
                if (rowCells.cells.length === 0) {
                    _.remove(cellsByRow, function (item) {
                        return rowCells === item;
                    });
                }
            }
        }

        function setInvalid(isInvalid) {
            self.$invalid = isInvalid;
            self.$valid = !isInvalid;
        }

        function untrack(row) {
            _.remove(invalidCellsByRow, function (item) {
                return item.row === row;
            });
            _.remove(dirtyCellsByRow, function (item) {
                return item.row === row;
            });
            setInvalid(invalidCellsByRow.length > 0);
        }
    }
})();

(function () {
    application_module.directive("trackedTableRow", trackedTableRow);

    trackedTableRow.$inject = [];

    function trackedTableRow() {
        return {
            restrict: "A",
            priority: -1,
            require: ["^trackedTable", "ngForm"],
            controller: trackedTableRowController
        };
    }

    trackedTableRowController.$inject = ["$attrs", "$element", "$parse", "$scope"];

    function trackedTableRowController($attrs, $element, $parse, $scope) {
        var self = this;
        var row = $parse($attrs.trackedTableRow)($scope);
        var rowFormCtrl = $element.controller("form");
        var trackedTableCtrl = $element.controller("trackedTable");

        self.isCellDirty = isCellDirty;
        self.setCellDirty = setCellDirty;
        self.setCellInvalid = setCellInvalid;

        function isCellDirty(cell) {
            return trackedTableCtrl.isCellDirty(row, cell);
        }

        function setCellDirty(cell, isDirty) {
            trackedTableCtrl.setCellDirty(row, cell, isDirty)
        }

        function setCellInvalid(cell, isInvalid) {
            trackedTableCtrl.setCellInvalid(row, cell, isInvalid)
        }
    }
})();

(function() {
    application_module.directive("trackedTableCell", trackedTableCell);

    trackedTableCell.$inject = [];

    function trackedTableCell() {
        return {
            restrict: "A",
            priority: -1,
            scope: true,
            require: ["^trackedTableRow", "ngForm"],
            controller: trackedTableCellController
        };
    }

    trackedTableCellController.$inject = ["$attrs", "$element", "$scope"];

    function trackedTableCellController($attrs, $element, $scope) {
        var self = this;
        var cellFormCtrl = $element.controller("form");
        var cellName = cellFormCtrl.$name;
        var trackedTableRowCtrl = $element.controller("trackedTableRow");

        if (trackedTableRowCtrl.isCellDirty(cellName)) {
            cellFormCtrl.$setDirty();
        } else {
            cellFormCtrl.$setPristine();
        }
        // note: we don't have to force setting validaty as angular will run validations
        // when we page back to a row that contains invalid data

        $scope.$watch(function() {
            return cellFormCtrl.$dirty;
        }, function(newValue, oldValue) {
            if (newValue === oldValue) return;

            trackedTableRowCtrl.setCellDirty(cellName, newValue);
        });

        $scope.$watch(function() {
            return cellFormCtrl.$invalid;
        }, function(newValue, oldValue) {
            if (newValue === oldValue) return;

            trackedTableRowCtrl.setCellInvalid(cellName, newValue);
        });
    }
})();
