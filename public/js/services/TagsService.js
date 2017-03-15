angular.module('TagsService', []).factory('Tags', ['$http',
    function($http) {
        return {
            getTags: function(callback) {
                $http({
                    method: 'get',
                    url: '/api/tags'
                }).success(function(data) {
                    //console.log(data);
                    callback(data);
                }).error(function() {
                    alert("error");
                });
            },
            getProducts: function(id, callback) {
                $http({
                    method: 'get',
                    url: '/api/tags/' + id
                }).success(function(data) {
                    //console.log(data);
                    callback(data);
                }).error(function() {
                    alert("error");
                });
            },
            getTagInfo: function(id, callback) {
                $http({
                    method: 'get',
                    url: '/api/tags/info/' + id
                }).success(function(data) {
                    //console.log(data);
                    callback(data);
                }).error(function() {
                    alert("error");
                });
            }
        };
    }
]);