'use strict';

angular.module('myApp.members', ['ngRoute'])

.controller('MembersCtrl', ['$scope','MemberService','$location','Cookies', function($scope,MemberService,$location,Cookies) {
	$scope.newestMembers = [];
	$scope.cleanVerifiedMembers = [];
	$scope.activeNewestMemberTab = true;
	$scope.activeCleanVerifiedTab =false;
	$scope.activeFeaturedMembersTab = false;
	$scope.featuredMembers = [];
	$scope.user=[];

	$scope.goToNewestMembers = function() {
		$scope.activeNewestMemberTab = true;
		$scope.activeFeaturedMembersTab = false;
		$scope.activeCleanVerifiedTab = false;
	}
	$scope.goToCleanVerified = function() {
		$scope.activeCleanVerifiedTab = true;
		$scope.activeNewestMemberTab = false;
		$scope.activeFeaturedMembersTab = false;

		// CLEAN VERIFIED
		var responseCleanVerified = MemberService.getCleanVerified();
			responseCleanVerified.then(function(response) {
				$scope.cleanVerifiedMembers = response.data.entity;
		  	},
		  	function(response) {
		  	});
	}
	$scope.goToFeaturedMembers = function() {
		$scope.activeFeaturedMembersTab = true;
		$scope.activeCleanVerifiedTab = false;
		$scope.activeNewestMemberTab = false;

		// FEATURED MEMBERS
		var responseFeaturedMembers = MemberService.getFeaturedMembers();
			responseFeaturedMembers.then(function(response) {
				$scope.featuredMembers = response.data.entity;
		  	},
		  	function(response) {

		  	});
	}
	

	// GET NEWEST MEMBERS
	var responseNewestMembers = MemberService.getNewestMembers();
		responseNewestMembers.then(function(response) {
			$scope.newestMembers = response.data.entity.data;
	  	},
	  	function(response) {

	  	});

	// SINGLE USER ID
	$scope.viewSingleUser = function(id) {
		Cookies.set('currUserForView', id);
		$location.path('/user/view_profile/' + id);
	}


    $scope.getLatAndLong = function() {
    	var responseSelf = MemberService.self();
		responseSelf.then(function(response){
        	$scope.user.iUserID=response.data.entity.iUserID;
	        var responseLatAndLong = MemberService.getGeolocation();
	        responseLatAndLong.then(function(response){
	            $scope.user.dLatitude=response.data.location.lat;
	            $scope.user.dLongitude=response.data.location.lng;
				MemberService.updateUser($scope.user);
	        },
		    function(response){
		    });
	    },
  	function(response){
  	});
    }
    $scope.getLatAndLong();
	Cookies.set('role',"User");

}]);