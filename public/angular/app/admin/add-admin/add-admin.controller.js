'use strict';

angular.module('myApp.add-admin', ['ngRoute'])

.controller('AddAdminCtrl', ['$scope','AddAdminService', function($scope,AddAdminService) {

	$scope.addNewAdmin = [];

	//CREATE NEW ADMIN
	$scope.createNewAdmin = function(admin) {
		$scope.addNewAdmin = admin;
		AddAdminService.addAdmin($scope.addNewAdmin);
	}
}]);