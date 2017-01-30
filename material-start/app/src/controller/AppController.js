var app = angular.module('apps')
  .controller('AppController', ['userService', 'messageService', '$mdSidenav', '$timeout', '$scope', '$q', '$route', function(userService, messageService, $mdSidenav, $timeout, $scope, $q, $route) {

    var self = this;
    self.message = null;
    self.validPhone = false;
    self.validEmail = false;

    /*------------------------  Autocomplete  ------------------------------- */

    //arrays with results
    self.users = [];
    self.names = [];
    self.emails = [];
    self.phones = [];

    //query variables and connection to md-autocomplete
    self.selectedItem = null;
    self.searchText = null;
    self.searchEmailText = null;
    self.searchNameText = null;
    self.searchPhoneText = null;
    self.queryNameSearch = queryNameSearch;
    self.queryEmailSearch = queryEmailSearch;
    self.queryPhoneSearch = queryPhoneSearch;
    self.simulateQuery = false;
    self.isDisabled = false;

    $scope.validate = function () {
      if (self.searchPhoneText != null) {
        var phoneRegex = /^[0-9]{10,11}$/;
        if(phoneRegex.test(self.searchPhoneText)){
          self.validPhone = true;
        }else{
          self.validPhone = false;
        }
      }

      if (self.searchPhoneText != null) {
        var phoneRegex = /^[0-9]{10,11}$/;
        if(phoneRegex.test(self.searchPhoneText)){
          self.validPhone = true;
        }else{
          self.validPhone = false;
        }
      }

    }

    //query for Name input
    function queryNameSearch (query) {
      console.log(query);
      userService.getData(query).then(function(response){
          self.users = response;
      });
      self.names = loadAllNames();
      var results = query ? self.names.filter( createFilterFor(query) ) : self.names, deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }

    }

    //query for Email input
    function queryEmailSearch (query) {
      self.emails = loadAllEmails();
      userService.getData(query).then(function(response){
          self.users = response;
      });
      var results = query ? self.emails.filter( createFilterFor(query) ) : self.emails, deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    //query for Phone input
    function queryPhoneSearch (query) {
      self.phones = loadAllPhones();
      userService.getData(query).then(function(response){
          self.users = response;
      });
      console.log(JSON.stringify(self.phones));
      var results = query ? self.phones.filter( createFilterFor(query) ) : self.phones, deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    //filter the closest match or matches
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }

    //declare the value of each object to its Name, later used in the filter
    function loadAllNames() {
      var repos = self.users;
      // console.log(JSON.stringify(repos));
      return repos.map( function (repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }

    //declare the value of each object to its Email, later used in the filter
    function loadAllEmails() {
      var repos = self.users;
      // console.log(JSON.stringify(repos));
      return repos.map( function (repo) {
        repo.value = repo.email.toLowerCase();
        return repo;
      });
    }

    //declare the value of each object to its Phone_Number, later used in the filter
    function loadAllPhones() {
      var repos = self.users;
      // console.log(JSON.stringify(repos));
      return repos.map( function (repo) {
        repo.value = repo.phone.toLowerCase();
        return repo;
      });
    }

    /*---------------------- Toggle LEFT sidebar -----------------------------*/

    //toggle left sidebar when hidden (xs screen device)
    $scope.toggleLeft = buildDelayedToggler('left');

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
            console.log("toggle");
          });
      }, 200);
    }

    /*-------------------------  Submit Form  --------------------------------*/

    $scope.submit = function(message, userForm) {
      var data = {'message' : message, 'email' : userForm.email.$viewValue, 'sms' : userForm.phone.$viewValue, 'name' : userForm.name.$viewValue};
      console.log(data);
      messageService.sendData(data).then(function(response) {
        if (response===200) {
          swal(
            'Message Sent!',
            'The recepient will get your message shortly.',
            'success'
          )
          self.selectedItem  = null;
          self.searchText    = null;
          self.searchEmailText = null;
          self.searchNameText = null;
          self.searchPhoneText = null;
          self.message = null;
          $route.reload();

        } else {
          swal(
            'Sorry!',
            'There was a problem sending your message, please try again later.',
            'error'
          )
          self.selectedItem  = null;
          self.searchText    = null;
          self.searchEmailText = null;
          self.searchNameText = null;
          self.searchPhoneText = null;
          self.message = null;
          $route.reload();
        }
      });
    }

    /*----------------------  Message Templates  -----------------------------*/

    $scope.template1 = function() {
      //Free Friday
      self.message = "";
      self.message = "Hi,\n\nSince you've managed to complete all your tasks for this week, you are not obligated to come to work on Friday!\n\nKeep up the good work.";
    }

    $scope.template2 = function() {
      //Meeting Reminder
      self.message = "Hello,\n\nA friendly reminder that we have a meeting today. Please confirm the time and place, available in the calendar system. \n\nThanks you.";
    }

    $scope.template3 = function() {
      //Lunch Set-Up
      self.message = "Hello,\n\nI was wondering if you would be available to go to lunch this week.\nLet me know if it is possible and when would it be best for you.";
    }

    $scope.template4 = function() {
      //Help ME!
      self.message = "Hi,  \n\nI was wondering if we could meet up today.\nI have a few questions about something and was wondering if you could help me.\n\nThank you!";
    }

    $scope.template5 = function() {
      //Happy Holidays
      self.message = "Hey there,\n\nI hope you have a wonderful time this holiday season.\nSee you when we come back.\n\nHappy Holidays! And have a wonderful vacation!";
    }


}]);
