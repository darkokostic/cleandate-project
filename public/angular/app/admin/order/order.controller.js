'use strict';

angular.module('myApp.order_admin', ['ngRoute'])

.controller('OrderCtrl', ['$scope','$location','OrderAdminService','$route', function($scope,$location,OrderAdminService,$route) {

	$scope.orderDetails = true;
	$scope.orderList = [];

	$scope.goToOrderDetails = function(index,orderStatus) {
		$scope.orderDetails = false;

		// SINGLE VIEW ORDER
		$scope.singleViewOrder = $scope.orderList[index];
		$scope.orderStatus = orderStatus;
		if ($scope.orderStatus == 'Pending') {
		$scope.changeOrderStatus = true;
		}
		else {
			$scope.changeOrderStatus = false;
		};
	}
	$scope.formatDate = function (date) {
        if (isNaN(Date.parse(date))){
            return 0;
        }
        return Date.parse(date);
    }

	// ORDER LIST
	var responseOrderList = OrderAdminService.getOrderList();
		responseOrderList.then(function(response) {
			$scope.orderList = response.data.entity;
                setTimeout(function() {
                    $('#orderList').DataTable({
                        "dom": '<lf<t>ip>'
                    });
                }, 300);
	  	},
	  	function(response) {

	  	});
	

  	//BACK TO ORDER LIST
  	$scope.BackToOrderList = function() {
  		$scope.orderDetails = true;
  	}

  	//DELETE ORDER
  	$scope.deleteOrder = function(id,index) {
		var responseDeleteOrder = OrderAdminService.httpDeleteOrder(id);
		responseDeleteOrder.then(function(response){
			var arr = [];
			for (var i = 0 ; i < $scope.orderList.length; i++) {
				if(i != index){
					arr.push($scope.orderList[i]);
				}
			}
			$scope.orderList = arr;
		},
		function(response){
		});
	}

	//USER STATUS
	// $scope.changeOrderStatus = true;
	if ($scope.orderStatus == 'Competed') {
		$scope.changeOrderStatus = true;
	}
	else {
		$scope.changeOrderStatus = false;
	}
	$scope.makeUserApproved = function(id) {
		var responseOrderApproved = OrderAdminService.approvedOrder(id);
			responseOrderApproved.then(function(response) {
				$route.reload();
		  	},
		  	function(response) {

		  	});
	}

	//DELETE ORDER
	$scope.makeUserDenied = function(id) {
		var responseOrderDenied = OrderAdminService.deniedOrder(id);
			responseOrderDenied.then(function(response) {
				$route.reload();
		  	},
		  	function(response) {

		  	});
	}
}]);