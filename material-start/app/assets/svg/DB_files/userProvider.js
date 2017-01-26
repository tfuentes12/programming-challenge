var app = angular.module("users")
  .config(function ($routeProvider, $locationProvider, $httpProvider) {


    $routeProvider.when('/home',
    {
      templateUrl:    'src/home_page/view/home_page.html',
      controller:     'HomeCtrl'
    });
    $routeProvider.when('/login',
    {
      templateUrl:    'login.html',
      controller:     'LoginCtrl'
    });
    $routeProvider.when('/courses',
    {
      templateUrl:    'src/courses/view/courses.html',
      controller:     'CoursesCtrl'
    });
    $routeProvider.when('/groups',
    {
      templateUrl:    'src/groups/view/groups.html',
      controller:     'GroupsCtrl'
    });
    $routeProvider.when('/tutors',
    {
      templateUrl:    'src/tutors/view/tutors.html',
      controller:     'TutorsCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/login',
      controller:     'LoginCtrl',
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

app.controller('CoursesCtrl', function($scope, $compile) {


});

app.controller('GroupsCtrl', function($scope, $compile) {


});


app.controller('HomeCtrl', function($scope, $compile) {

});

app.controller('LoginCtrl', function($scope, $compile) {

});