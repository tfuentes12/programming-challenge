angular.module('users')
.factory('userService', [
'$http',
function($http) {

  var host = "http://yifteeqa.com";

	var userService = {};

  userService.getData = function (param) {
		return $http.get(host + "/programming_challenge/autocomplete?q=" + param)
		.then(function (response) {
			return response.data.response.contacts;
		})
		.then(null, function (err) {
			console.error(err);
		});
	};

	return userService;
}]);
