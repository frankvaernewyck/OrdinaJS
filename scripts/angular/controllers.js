'use strict';

angular.module('microApp')
    .controller('microController', function ($scope, $http, $filter) {
        var totalNodes;
        var totalLinks;
        var originalData;
        $scope.showTheDetails = function (node) {
            var single_node = $filter('filter')($scope.nodes.nodes, function (d) {
                return d.id === node.id
            });
            //console.log(single_node[0]);
            $scope.currentNode = single_node[0];
            $scope.$apply();
        };
        $scope.reset = function () {
            console.log("reset");
            $scope.resetGraph($scope.nodes);
            $scope.resetFilter();
        };
        $http.get("scripts/data/data.json")
            .success(function (data) {
                totalNodes = data.nodes;
                totalLinks = data.links;

                $scope.title = data.title;
                $scope.description = data.description;
                $scope.appVersion = data.appVersion;
                $scope.nodes = data;
                originalData = data;
            })
            .error(function (data, status) {
                console.log(status);
            });
        $scope.$watchGroup(['nodeSearch.id', 'nodeSearch.status', 'nodeSearch.type', 'nodeSearch.group'], function () {
            if ($scope.nodes != undefined) {
                $scope.nodes.nodes = $filter('nodeFilter')(totalNodes, $scope.nodeSearch);
                $scope.nodes.links = $filter('linkFilter')(totalLinks, $scope.nodes.nodes);
                $scope.resetGraph($scope.nodes);
            }
        });

        $scope.resetFilter = function() {
            $scope.nodeSearch.id = undefined;
            $scope.nodeSearch.status = undefined;
            $scope.nodeSearch.type = undefined;
            $scope.nodeSearch.group = undefined;
        }

    });

