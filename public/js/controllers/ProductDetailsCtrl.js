angular.module('ProductDetailsCtrl', []).controller('ProductDetailsController', function($scope, $routeParams, Products, BasketItems, Tags) {
    var id = $routeParams.id;

    Products.getOne(id, function(data) {
        $scope.product = data;
        $scope.qty = null;
    });

    $scope.addToBasket = function(product) {
        BasketItems.addOne(product._id, $scope.qty, product.title, product.price, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };

    Products.getTags(id, function(data){
            $scope.tags = data.tags
    });

    Products.getRecommendations(id, function(data){
        $scope.recommendations = data.recommendations
    })
});