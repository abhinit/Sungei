angular.module('TagsCtrl', []).controller('TagsController', function($scope, $routeParams, Tags) {
    var id = $routeParams.id;
    Tags.getProducts(id, function(data) {
        $scope.products = data.product
    });
    Tags.getTagInfo(id, function(data){
        $scope.tag = data.tag
    });
});