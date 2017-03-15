angular.module('TagsListCtrl', []).controller('TagsListController', function($scope, Tags) {
    Tags.getTags(function(data) {
        $scope.tags = data.tag
    });
});