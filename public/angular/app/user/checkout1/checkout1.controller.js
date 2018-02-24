'use strict';

angular.module('myApp.checkout1', ['ngRoute'])

.controller('Checkout1Ctrl', ['$scope','Checkout1Service','MemberService', function($scope,Checkout1Service,MemberService) {


	$scope.userId = [];
	$scope.orderId=[];
	$scope.checkoutButton = false;
	//USER ID
	$scope.getUserId = function() {
    	var responseSelf = MemberService.self();
		responseSelf.then(function(response){
			$scope.userId = response.data.entity.iUserID;

        },
	  	function(response){
	  	});
	}

	//SEND DATA
	$scope.sendChackoutData = function(checkout) {
		$scope.checkoutData = checkout;
		$scope.userIdCheckout = $scope.userId;
        var responseCheckout = Checkout1Service.checkoutData($scope.checkoutData,$scope.userIdCheckout);
        responseCheckout.then(function(response){
                $scope.orderId = response.data.entity.id;
                var input = document.getElementById('stripe_user');
                input.value =  response.data.entity.id;
                $scope.checkoutButton = true;
                $('#skrillModel').modal('show');

            },
            function(response){
            });
	}

}]);