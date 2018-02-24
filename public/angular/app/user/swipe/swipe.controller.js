'use strict';

angular.module('myApp.swipe', ['ngRoute'])

.controller('SwipeCtrl', ['$scope','SwipeService','$location', function($scope,SwipeService,$location) {
	$scope.swipePage2 = true;
	$scope.swipe=[];
	$scope.noData = false;
	$scope.goToSwipePage2 = function() {
		$scope.swipePage2 = false;
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
	$scope.init=function() {
	var responseSwipes = SwipeService.getSwipe();
		responseSwipes.then(function(response) {
			$scope.swipes=response.data.entity;
			if ($scope.swipes.length != 0){
                for (var key in response.data.entity) {
                    if (response.data.entity.hasOwnProperty(key)) {
                        if(response.data.entity[key]){
                            $scope.swipe=response.data.entity[key];
                            $scope.func($scope.swipe);
                            break;
                        }
                    }
                }
			}else{
                $scope.noData = true;
			}

	  	},
	  	function(response) {

	  	});
	}

	  	$scope.likeUser = function(user) {
	  		user.type='Like';
	  		var nextSwipe = SwipeService.likeUser(user);
			nextSwipe.then(function(response) {
	  			$scope.init();
		  	},
		  	function(response) {
		  	});
		}
	  	$scope.dislikeUser = function(user) {
	  		user.type='Dislike';
	  		var nextSwipe = SwipeService.likeUser(user);
			nextSwipe.then(function(response) {
	  			$scope.init();
		  	},
		  	function(response) {
		  	});
	  	}

	  	$scope.viewProfile = function(userId) {
	  		Cookies.set('currUserForView',userId);
	  		$location.path('/user/view_profile/' + userId);
	  	}

}]);