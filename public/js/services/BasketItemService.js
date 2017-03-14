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

        basketService.addOne = function(id, qty, callback) {
            caller = this;
            $http({
                method: 'get',
                url: '/api/cart/Add/' + id + '/' + qty
            }).success(function(data) {
                //setItemCount(10);
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                callback(err);
            });
        };

        return basketService;
    }
]);