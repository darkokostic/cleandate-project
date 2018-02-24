'use strict';

angular.module('myApp.my_profile_service', ['ngRoute','toastr'])
	.service('MyProfileService', function ($http,$q,toastr,$location) {
		return{
			
			// MY PROFILE VIEW
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

	    	//CLOSEST MEMBER
	    	getClosestMember: function(){
		        var defer = $q.defer();
		        $http({
		        method: 'GET',
		        data:{

		        },
		        url: 'api/closest-member'
		        }).then(function successCallback(response) {
		            defer.resolve(response);
		            return response;
		        }, function errorCallback(response) {
		            defer.reject(response);
		        });
		        return defer.promise;
	    	},

	    	// EDIT MY PROFILE
	        updateUser: function(user){
	        	$http({
	            method: 'PATCH',
	            data: {
	            	'age': user.age,
	            	'vFullname': user.vFullname,
					'dDob': user.dDob,
					'eGender': user.eGender,
					'eStatus': user.eStatus,
					'iRadius': user.iRadius,
					'eShowMe': user.eShowMe,
					'tAbout': user.tAbout,
					'tSelectedWork': user.tSelectedWork,
					'eShowMe': user.eShowMe
	                
	            },
	            url: 'api/user/update/'+user.iUserID
	    	    }).then(function successCallback(response) {
	    	    	toastr.success(response.data.message);

	    	    }, function errorCallback(response) {
	    	    	toastr.warning("Error");
	    	  	});

	        }
	    }

});
