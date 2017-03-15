// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/product-list.html',
                controller: 'ProductListController'
            })
            .when('/product/:id', {
                templateUrl: '/views/product-details.html',
                controller: 'ProductDetailsController'
            })
            .when('/basket', {
                templateUrl: '/views/basket.html',
                controller: 'BasketController'
            })
            .when('/tags', {
                templateUrl: '/views/tags-list.html',
                controller: 'TagsListController'
            })
            .when('/tags/:id', {
                templateUrl: '/views/tags-products.html',
                controller: 'TagsController'
            });

        $locationProvider.html5Mode(true);
    }
]);