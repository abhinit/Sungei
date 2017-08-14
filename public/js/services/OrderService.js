angular.module('OrderService', [])

.factory('Order', function($http) {
	orderFactory = {};

	orderFactory.create = function(orderData, username) {
		orderData.username = username
		return $http.post('/api/orders/', orderData);
	}

	return orderFactory;
});