'use strict';

angular.module('myApp.user-list', ['ngRoute'])

.controller('UserListCtrl', ['$scope','UserListService', function($scope,UserListService) {

	$scope.userListActive = true;
	$scope.addNewUser = false;
	$scope.singleViewUser = false;
	$scope.allUsersList = [];
	$scope.adminSeeSingleUser = [];
	$scope.allPages = [];
	$scope.nextPageUserList = [];
	$scope.usersOnNextPage = [];
	$scope.showBtnLastPrevios = [];
	$scope.searchDate={'from':'','to':''};
	$scope.searchDateToWrite={'from':'','to':''};
	$scope.searchTerm=[];
	$scope.searchTerm.searchDateToWrite=$scope.searchDateToWrite;

	function formatDate(date) {
	  var monthNames = [
	    "1", "2", "3",
	    "4", "5", "6", "7",
	    "8", "9", "10",
	    "11", "12"
	  ];

	  var day = date.getDate();
	  var monthIndex = date.getMonth();
	  var year = date.getFullYear();
	return year+'-'+monthNames[monthIndex]+'-'+day;
	  
	}
	$scope.search = function() {
		$scope.searchTerm.searchDateToWrite.from=formatDate($scope.searchTerm.searchDate.from);
		$scope.searchTerm.searchDateToWrite.to=formatDate($scope.searchTerm.searchDate.to);
		UserListService.userSearch($scope.searchTerm);
	}

	$scope.goToAddNewUser = function() {
		$scope.userListActive = false;
		$scope.addNewUser = true;
		$scope.singleViewUser = false;
	}
	
	  $scope.func=function(user) {
	  var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+user.dLatitude+","+user.dLongitude+"&key=AIzaSyBnICk37tkvyjby446VXMfe1c0-A34AUHU";

		$.getJSON(geocodingAPI, function (json) {
		     if (json.status == "OK") {
		         var result = json.results[0];
		         var city = "";
		         var state = "";
		         for (var i = 0, len = result.address_components.length; i < len; i++) {
		             var ac = result.address_components[i];
		            if (ac.types.indexOf("administrative_area_level_1") >= 0 || ac.types.indexOf("locality") >= 0 ) {
		            	user.city = ac.long_name;
		            }
		            if (ac.types.indexOf("country") >= 0) {
		            	user.country = ac.long_name;
		            }
		         }
		     }

		 });

	  }
	$scope.goToSingleViewUser=function(id) {
		$scope.singleViewUser = true;
		$scope.userListActive = false;
		$scope.addNewUser = false;

		$scope.adminSeeSingleUser = id;

		// USER SINGLE VIEW
		var responseUserSingleView = UserListService.getUserSingleView($scope.adminSeeSingleUser);
			responseUserSingleView.then(function(response) {
				$scope.singleViewUserData = response.data.entity;
				$scope.singleViewUserData.dAddedDateTime = Date.parse($scope.singleViewUserData.dAddedDateTime);
				if (isNaN($scope.singleViewUserData.dAddedDateTime)){
                    $scope.singleViewUserData.dAddedDateTime = 0;
				}
				$scope.singleViewMatchesUsers = response.data.entity.matches;
				$scope.singleViewUserImages = response.data.entity.images;
				$scope.func($scope.singleViewUserData);
		  	},
		  	function(response) {

		  	});
	}
	$scope.formatUserDate = function (user) {
        if (isNaN(Date.parse(user.dAddedDateTime))){
            return 0;
        }
        return Date.parse(user.dAddedDateTime);
    }
	$scope.goBackToList = function() {
		$scope.singleViewUser = false;
		$scope.userListActive = true;
		$scope.addNewUser = false;
        var responseUserList = UserListService.getUserList();
        responseUserList.then(function(response) {
                $scope.allUsersList=response.data.entity;
                setTimeout(function() {
                    $('#userList').DataTable({
                        "dom": '<lf<t>ip>'
                    });
                }, 300);
            },
            function(response) {

            });
	}

	// USER LIST
	var responseUserList = UserListService.getUserList();
		responseUserList.then(function(response) {
				$scope.allUsersList=response.data.entity;
				setTimeout(function() {
					$('#userList').DataTable({
			            "dom": '<lf<t>ip>'
			        });
				}, 300);
	  	},
	  	function(response) {

	  	});
	//CREATE NEW USER
	$scope.createNewUser = function(user) {
		$scope.newUserData = user;
		UserListService.addNewUser($scope.newUserData);
	}
}]);