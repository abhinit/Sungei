angular.module('BasketCtrl', ['OrderService','AuthService'])

.controller('BasketController', function(Order, $scope, BasketItems, $location, $timeout, Auth) {
    
    BasketItems.getAll(function(data) {
        // console.log("data in basket")
        // console.log(data);
        var app = this;        
        $scope.currentBasketItems = data;
        $scope.products = data.products;
        $scope.totalPrice = data.totalPrice;
        // Retrieve username  
        Auth.getUser().then(function(data) {
            app.username = data.data.username;
            $scope.username = app.username
        });       
    }); 

    $scope.basketItemCount = BasketItems.itemCount;

    $scope.addOrderDetails = function () {
        // console.log(BasketItems);
        var app = this;
        Order.create($scope.currentBasketItems, $scope.username).then(function(data) {
            if(data.data.success) {                
                //redirect to profile page                
                app.successMsg = data.data.message + "...redirecting to the profile page";
                $timeout(function() { $location.path('/profile'); }, 2000);                
            } else {                
                app.errorMsg = data.data.message;                
            }
        });
    }

    $scope.getSuccessMsg = function (){
        var app = this;
        return app.successMsg;
    }

    $scope.getErrorMsg = function (){
        var app = this;
        return app.errorMsg;
    }

    $scope.$on('handleItemCount', function() {
        $scope.basketItemCount = BasketItems.itemCount;
    });

    $scope.$on('basketUpdate', function(event, args) {alert('caught');});
});