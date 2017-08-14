angular.module('frontendApp', ['ngRoute', 'appRoutes', 'ProductListCtrl', 'ProductDetailsCtrl', 'ProductService', 'BasketCtrl', 'BasketItemService', 'TagsCtrl', 'TagsListCtrl', 'TagsService', 'SearchCtrl', 'UserCtrl', 'UserService', 'MainCtrl', 'AuthService','OrderService'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});