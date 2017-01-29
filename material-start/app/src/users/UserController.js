var app = angular.module("users")
  .controller('UserController', ['userService', '$scope', '$compile', '$location', '$rootScope', '$mdDialog', '$q', function(userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope, $q) {

    $scope.toggleLeft = buildDelayedToggler('left');
    var self = this;
    self.users = [];
    self.contacts = [];

    userService.getData("a")
      .then(function(response){
            self.users = response;
            console.log(self.users);
            self.contacts = loadAllNames();

      });

      self.selectedItem  = null;
      self.searchText    = null;
      self.querySearch   = querySearch;
      self.simulateQuery = false;
      self.isDisabled    = false;

      function querySearch (query) {
        var results = query ? self.contacts.filter( createFilterFor(query) ) : self.contacts, deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function loadAllNames() {
        var repos = self.users;
        console.log(JSON.stringify(repos));
        return repos.map( function (repo) {
          repo.value = repo.name.toLowerCase();
          return repo;
        });
      }

      function loadAllEmails() {
        var repos = self.users;
        console.log(JSON.stringify(repos));
        return repos.map( function (repo) {
          repo.value = repo.email.toLowerCase();
          return repo;
        });
      }

      function loadAllPhones() {
        var repos = self.users;
        console.log(JSON.stringify(repos));
        return repos.map( function (repo) {
          repo.value = repo.phone.toLowerCase();
          return repo;
        });
      }

      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };

      }


    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    // Hide or Show the 'left' sideNav area
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }


}]);
