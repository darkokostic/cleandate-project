'use strict';

angular.module('myApp.admin-list', ['ngRoute'])

.controller('AdminListCtrl', ['$scope','AdminListService','$filter', function($scope,AdminListService,$filter) {

	$scope.adminList = [];
	$scope.admins = [];
	$scope.updateAdmin = true;
	$scope.aboutSingleAdmin = [];
	$scope.editSingleAdminData = [];
	$scope.searchDate={'from':'','to':''};
	$scope.searchDateToWrite={'from':'','to':''};
	$scope.searchTerm=[];
	$scope.searchTerm.searchDateToWrite=$scope.searchDateToWrite;

	//SINGLE VIEW ADMIN AND EDIT
	$scope.goToSingleAdmin = function(singleAdmin) {
		$scope.updateAdmin = false;
		$scope.aboutSingleAdmin = singleAdmin;

	}

	//SEARCH USERS
	$scope.search=function(searchTerm){
		$scope.searchTerm.searchDateToWrite.from=formatDate($scope.searchTerm.searchDate.from);
		$scope.searchTerm.searchDateToWrite.to=formatDate($scope.searchTerm.searchDate.to);
		AdminListService.userSearch($scope.searchTerm);
	}
	//SAVE EDITS FOR SINGLE ADMIN
	$scope.saveEditedAdmin = function(aboutSingleAdmin) {
		$scope.editSingleAdminData = aboutSingleAdmin;
		$scope.editSingleAdminData.iAdminID = $scope.aboutSingleAdmin.iAdminID;
		AdminListService.updateAdmin($scope.editSingleAdminData);
	}

	//BACK TO ADMIN LIST
	$scope.BackToAdminList = function() {
        var responseAdminList = AdminListService.getAdminList();
        responseAdminList.then(function(response) {
                $scope.adminList = response.data.entity;
                setTimeout(function() {
                    $('#adminList').DataTable({
                        "dom": '<lf<t>ip>'
                    });
                }, 300);
            },
            function(response) {

            });
		$scope.updateAdmin = true;
	}
    $scope.formatDate = function (date) {
		if (isNaN(Date.parse(date))){
			return 0;
		}
        return Date.parse(date);
    }
	// ADMIN LIST
	var responseAdminList = AdminListService.getAdminList();
		responseAdminList.then(function(response) {
			$scope.adminList = response.data.entity;
			setTimeout(function() {
				$('#adminList').DataTable({
		            "dom": '<lf<t>ip>'
		        });
			}, 300);
	 	},
	  	function(response) {

	  	});
	//DELETE ADMIN
	$scope.deleteAdmin = function(adminId,index) {
		var responseDeleteAdmin = AdminListService.httpDeleteNews(adminId);
		responseDeleteAdmin.then(function(response){
			var arr = [];
			for (var i = 0 ; i < $scope.adminList.length; i++) {
				if(i != index){
					arr.push($scope.adminList[i]);
				}
			}
			$scope.adminList = arr;
		},
		function(response){
		});
	}

}]);