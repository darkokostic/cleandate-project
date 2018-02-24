'use strict';

angular.module('myApp.admin_home_controller', ['ngRoute'])

.controller('AdminHomeCtrl', ['$scope','$location','AdminHomeService', function($scope,$location,AdminHomeService) {

	$scope.dashboardStatistic = [];
	$scope.monthStatistic = [];
	$scope.dashboardVerification = [];
	

	// DASHBOARD STATISTIC
	var responseDashboardStatistic = AdminHomeService.getDashboardStatistic();
		responseDashboardStatistic.then(function(response) {
			$scope.dashboardStatistic = response.data.entity;
	  	},
	  	function(response) {
	  	});

	// Requests for Varification
	$scope.statisticByYears = function(year) {
		$scope.monthStatistic = [];
		var responseRequestsForVarification = AdminHomeService.getRequestsforvarification(year);
			responseRequestsForVarification.then(function(response) {
				if (response.data.entity['01']) {
					var ret = {
						'month' : 'January',
						'size'  : response.data.entity['01'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['02']) {
					var ret = {
						'month' : 'February',
						'size'  : response.data.entity['02'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['03']) {
					var ret = {
						'month' : 'March',
						'size'  : response.data.entity['03'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['04']) {
					var ret = {
						'month' : 'April',
						'size'  : response.data.entity['04'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['05']) {
					var ret = {
						'month' : 'May',
						'size'  : response.data.entity['05'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['06']) {
					var ret = {
						'month' : 'June',
						'size'  : response.data.entity['06'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['07']) {
					var ret = {
						'month' : 'July',
						'size'  : response.data.entity['07'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['08']) {
					var ret = {
						'month' : 'August',
						'size'  : response.data.entity['08'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['09']) {
					var ret = {
						'month' : 'September',
						'size'  : response.data.entity['09'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['10']) {
					var ret = {
						'month' : 'October',
						'size'  : response.data.entity['10'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['11']) {
					var ret = {
						'month' : 'November',
						'size'  : response.data.entity['11'].length
					};
					$scope.monthStatistic.push(ret);
				};
				if (response.data.entity['12']) {
					var ret = {
						'month' : 'December',
						'size'  : response.data.entity['12'].length
					};
					$scope.monthStatistic.push(ret);
				};
		  	},
		  	function(response) {

		  	});
	}

	// DASHBOARD VERIFICATION
	var responseDashboardVerification = AdminHomeService.getDashboardVerification();
		responseDashboardVerification.then(function(response) {
			$scope.dashboardVerification = response.data.entity;
	  	},
	  	function(response) {
	  	});

	// DASHBOARD VERIFICATION APPROVE
	$scope.makeUserVerify = function(id,index) {
		var responseDashboardVerificationApprove = AdminHomeService.getDashboardVerificationApprove(id);
			responseDashboardVerificationApprove.then(function(response) {
				var arr = [];
				for (var i = 0 ; i < $scope.dashboardVerification.length; i++) {
					if(i != index){
						arr.push($scope.dashboardVerification[i]);
					}
				}
				$scope.dashboardVerification = arr;
		  	},
		  	function(response) {
		  	});
  	}

  	//DASHBOARD VERIFICATION DENIED
  	$scope.makeUserDenied = function(id,index) {
  		var responseDashboardVerificationDenied = AdminHomeService.getDashboardVerificationDenied(id);
			responseDashboardVerificationDenied.then(function(response) {
				var arr = [];
				for (var i = 0 ; i < $scope.dashboardVerification.length; i++) {
					if(i != index){
						arr.push($scope.dashboardVerification[i]);
					}
				}
				$scope.dashboardVerification = arr;
		  	},
		  	function(response) {
		  	});
  	}
}]);