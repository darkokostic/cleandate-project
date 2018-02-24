'use strict';

angular.module('myApp.view_profile_service', ['ngRoute'])
  	.service('ViewProfileService', function ($http,$q,toastr) { 
		return {

			// SINGLE VIEW MEMBERS
	        getSingleViewMembers: function(userId){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/member/' + userId
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // FAVORITE USER
	        favoriteUser: function(id){
	        	var defer = $q.defer();
	        	$http({
	            method: 'POST',
	            data: {
	            	'user_id' : id
	                
	            },
	            url: 'api/user/favorite'
	    	    }).then(function successCallback(response) {
	    	    	toastr.success(response.data.message);
	    	    	defer.resolve(response);
	                return response;

	    	    }, function errorCallback(response) {
	    	    	defer.reject(response);
	    	    	toastr.warning(response.data.message);
	    	  	});
	    	  	return defer.promise;

	        }

	       
	    }
});
