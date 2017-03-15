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
            if (err) {
                alert (err);
                return;
            }
            $scope.tags = data.tags
    })
});