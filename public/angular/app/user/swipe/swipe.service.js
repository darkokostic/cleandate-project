'use strict';

angular.module('myApp.swipe_service', ['ngRoute'])
  	.service('SwipeService', function ($q,$http) { 
  		return{

			// GET NEWEST MEMBERS
			getSwipe: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/review-users'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        //LIKE USER
	        likeUser: function(user){
	            var defer = $q.defer();
	            $http({
	            method: 'POST',
	            data:{
	            	'type' : user.type,
	            	'user_id' : user.iUserID
	            },
	            url: 'api/rate-user'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        }
	    }
});
