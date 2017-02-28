angular.module('BasketCtrl', []).controller('BasketController', function($scope, BasketItems) {
    BasketItems.getAll(function(data) {
        console.log("data in basket")
        console.log(data);
        $scope.products = data.products;
        $scope.totalPrice = data.totalPrice;
    });

    $scope.basketItemCount = BasketItems.itemCount;

    $scope.$on('handleItemCount', function() {
        $scope.basketItemCount = BasketItems.itemCount;
    });

    //$scope.$on('basketUpdate', function(event, args) {alert('caught');});
});