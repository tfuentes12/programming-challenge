var app = angular.module("users")
  .config(function ($routeProvider, $locationProvider, $httpProvider) {


    $routeProvider.when('/home',
    {
      templateUrl:    'src/home_page/view/home_page.html',
      controller:     'HomeCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home',
      controller:     'HomeCtrl',
    });

});

app.controller('NavCtrl',
['$scope', '$location', function ($scope, $location) {

  if($location.path().length>3){
    $scope.currentNavItem = $location.path();
  }
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'all';
    return page === currentRoute ? 'active' : '';
  };
}]);


app.controller('HomeCtrl', function($scope, $compile) {

});
