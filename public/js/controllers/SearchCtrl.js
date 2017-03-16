angular
    .module('SearchCtrl', [])
    .controller('SearchController',
        function ($scope, $routeParams, Products) {
            var search = $routeParams.search;
            $scope.search = search;

            Products.getSearch(search, function (data) {
                $scope.products = data.products
            });
        });