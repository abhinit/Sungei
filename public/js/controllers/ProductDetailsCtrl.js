angular.module('ProductDetailsCtrl', []).controller('ProductDetailsController', function($scope, $routeParams, Products, BasketItems, Tags) {
    var id = $routeParams.id;

    Products.getOne(id, function(data) {
        // console.log("Product details intialized", id, data);
        $scope.product = data;
        $scope.qty = null;
    });

    $scope.submit = function() {
        if ($scope.comment) {
          new_comment = {
            "comment" : $scope.comment
          }
          $scope.product.comments.push(new_comment)

        // CALL A SERVICE , PASS THIS DATA , UPDATE IN DB
        Products.updateProductDetails_PostComment(id, $scope.product,  function(data){
            $scope.result = data
            console.log(data)
            });          
        }
        // Clear comment box
        $scope.comment = ""
        // Update in DB
    };

    $scope.addToBasket = function(product) {
        BasketItems.addOne(product._id, $scope.qty, product.title, product.price, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };

    Products.getTags(id, function(data){
            $scope.tags = data.tags
    });

    Products.getRecommendations(id, function(data){
        $scope.recommendations = data.recommendations
    })
});