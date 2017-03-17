angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, Products, Tags) {
    Products.getAll(function(data) {
        $scope.products = data.product
    });

    Tags.getTags(function(data){
        $scope.tags = data.tag
    })
});