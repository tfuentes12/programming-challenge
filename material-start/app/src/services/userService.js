angular.module('apps')
.factory('userService', ['$http', function($http) {

  /*------------------------ Get data for autocomplete -----------------------*/

  var host = "http://yifteeqa.com";

  return {
        getData: function(param) {
            return $http.get(host + "/programming_challenge/autocomplete?q=" + param).then(function(response) {
                return response.data.response.contacts;
            });
        }

    };

}]);
