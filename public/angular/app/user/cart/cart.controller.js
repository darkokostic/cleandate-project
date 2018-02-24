'use strict';

angular.module('myApp.cart', ['ngRoute'])

.controller('CartCtrl', ['$scope','MemberService','CartService', function($scope,MemberService,CartService) {

	$scope.userVerify = [];
	$scope.haveVerification = false;
    $scope.userOrderCheck = false;
    $scope.showCart = true;

	//DO YOU HAVE VERIFICATION
	$scope.verification = function() {
    	var responseSelf = MemberService.self();
		responseSelf.then(function(response){
			$scope.userVerify = response.data.entity.isVerifiedByAdmin;
			$scope.user = response.data.entity;
			if ($scope.userVerify == 'Yes') {
				$scope.haveVerification = true;
				$scope.showCart = false;
			}else{
                var responseCheck = CartService.checkOrder($scope.user.iUserID);
                responseCheck.then(function(response){
                        $scope.showCart = true;
                    },
                    function(response){
                        $scope.userOrderCheck = true;
                        $scope.showCart = false;

                    });
			}

	    },
	  	function(response){
	  	});



    }
	
}]);