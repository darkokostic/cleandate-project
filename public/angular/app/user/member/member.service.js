'use strict';

angular.module('myApp.member_service', ['ngRoute'])
	.service('MemberService', function ($http,$q,toastr) {
		return{

			// GET NEWEST MEMBERS
			getNewestMembers: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/newest-members'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // CLEAN VERIFIED
	        getCleanVerified: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/verified-users'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // FEATURED MEMBERS
	        getFeaturedMembers: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/featured-users'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },
	        updateUser: function(user){
	        	$http({
	            method: 'PATCH',
	            data: {
	            	'dLatitude': user.dLatitude,
	            	'dLongitude': user.dLongitude
	            },
	            url: 'api/user/update/'+user.iUserID
	    	    }).then(function successCallback(response) {

	    	    }, function errorCallback(response) {
	    	  	});

	        },
	        self: function(){
		        var defer = $q.defer();
		        $http({
		        method: 'GET',
		        data:{

		        },
		        url: 'api/self'
		        }).then(function successCallback(response) {
		            defer.resolve(response);
		            return response;
		        }, function errorCallback(response) {
		            defer.reject(response);
		        });
		        return defer.promise;
	    	},
	    	getGeolocation: function() {
	            var defer = $q.defer();
	            $http({
	                method: 'POST',
	                url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBnICk37tkvyjby446VXMfe1c0-A34AUHU'
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
