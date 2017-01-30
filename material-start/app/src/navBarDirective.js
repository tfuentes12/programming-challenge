'use strict';

angular.module('apps')
	.directive('navbar',function(){
		return {
        templateUrl:'src/navBar.html',
        restrict: 'E',
        replace: true,
    	}
	});
