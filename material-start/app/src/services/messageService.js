angular.module('apps')
.factory('messageService', ['$http', function($http) {

  /*--------------------------  Send message  --------------------------------*/

  var host = "http://yifteeqa.com";

  return {
        sendData: function(params) {
            return $http.post(host + "/programming_challenge/message", params).then(function(response) {
                console.log(response.data);
                return response.data.meta.code;
            });
        }
    };

}]);
