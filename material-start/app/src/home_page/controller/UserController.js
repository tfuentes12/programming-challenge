var app = angular.module("users")
  .controller('UserController', function(userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope, $q) {

    // Hide or Show the 'left' sideNav area
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }


  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };

});
