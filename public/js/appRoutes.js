// public/js/appRoutes.js
// var app = angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
//     function($routeProvider, $locationProvider) {
var app = angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {        
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
            controller: 'BasketController',
            authenticated: true
        })
        .when('/tags', {
            templateUrl: '/views/tags-list.html',
            controller: 'TagsListController'
        })
        .when('/tags/:id', {
            templateUrl: '/views/tags-products.html',
            controller: 'TagsController'
        })
        .when('/login', {
            templateUrl: '/views/users/login.html',
            authenticated: false               
        })    
        .when('/logout', {
            templateUrl: '/views/users/logout.html',
            authenticated: true          
        })                        
        .when('/register', {
            templateUrl: '/views/users/register.html',
            controller: 'regCtrl',
            controllerAs: 'register',
            authenticated: false
        })
        .when('/profile', {
            templateUrl: '/views/users/profile.html',
            authenticated: true
        })            
        .when('/search/:search', {
            templateUrl: '/views/search.html',
            controller: 'SearchController'
        })
        .when('/checkout', {
            templateUrl: '/views/checkout.html',
            authenticated: true,
            controller:'BasketController'
        })       

        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
});

// Restricting routes (ex. Access login page when login was already done)
app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if(next.$$route.authenticated == true) {
            if(!Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                }
            } else if(next.$$route.authenticated == false) {
                if(Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }            
            } 
    });
}]);