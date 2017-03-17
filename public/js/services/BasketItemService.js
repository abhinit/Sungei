angular.module('BasketItemService', []).factory('BasketItems', ['$http', '$rootScope',
    function($http, $rootScope) {
        var basketService = {};

        basketService.itemCount = 0;

        basketService.broadcastItemCount = function() {
            $rootScope.$broadcast('handleItemCount');
        };


        basketService.getAll = function(callback) {
            caller = this;
            $http({
                method: 'get',
                url: '/api/cart/'
            }).success(function(data) {
                console.log("in service")
                console.log(data)
                caller.itemCount = data.products.length;
                caller.broadcastItemCount();
                callback(data);
            }).error(function() {
                alert("error");
            });
        };

        basketService.addOne = function(id, qty, title, price, callback) {
            caller = this;
            $http({
                method: 'post',
                url: '/api/cart/add/',
                data: {
                    id : id,
                    qty : parseInt(qty),
                    title : title,
                    price : price
                }
            }).success(function(data) {
                //setItemCount(10);
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                console.log(data)
                callback(null, data);
            }).error(function(err) {
                callback(err);
            });
        };

        return basketService;
    }
]);