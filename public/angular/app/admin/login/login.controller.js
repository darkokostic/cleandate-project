'use strict';

angular.module('myApp.login', ['ngRoute'])

.controller('LoginCtrl', ['$scope','$location','LoginService', function($scope,$location,LoginService) {
	$scope.admin=[];

	$scope.login = function(admin) {
		var loginAdmin = LoginService.loginAdmin(admin);
			loginAdmin.then(function(response) {
				$location.path('/admin/admin_home')
		  	},
		  	function(response) {

		  	});
	}
	
}]);