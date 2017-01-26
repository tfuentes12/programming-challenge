var app = angular.module("users")
.controller('submitController', function($scope, $compile, $location) {
    $scope.tutor = "No";

    $scope.submitInfo = function(){
        $location.path("#/home");
    }

});
