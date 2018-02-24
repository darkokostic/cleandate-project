'use strict';

angular.module('myApp.settings_service', ['ngRoute','toastr'])
  .service('SettingsService', function ($http,$q,toastr) { 
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

	    	//DELETE ACC
	    	deleteAcc: function(){
		        var defer = $q.defer();
		        $http({
		        method: 'GET',
		        data:{

		        },
		        url: 'api/delete-acc'
		        }).then(function successCallback(response) {
		            defer.resolve(response);
		            return response;
		            toastr.success(response.data.message);
		        }, function errorCallback(response) {
		            defer.reject(response);
		            toastr.warning(response.data.message);
		        });
		        return defer.promise;
	    	},

	    	//UPDATE USER SETTINGS
	    	updateSettings: function(user){
	            var defer = $q.defer();
	            $http({
	            method: 'PATCH',
	            data:{

			        'iAgeRangeTo': user.iAgeRangeTo,
			        'iAgeRangeFrom': user.iAgeRangeFrom,
			        'iRadius': user.iRadius,
			        'eDiscoverMe': user.eDiscoverMe,
			        'eShowMe': user.eShowMe
	            },
	            url: 'api/user/update/'+user.iUserID
	            }).then(function successCallback(response) {
	                toastr.success(response.data.message);
	                return response;
	            }, function errorCallback(response) {
	                toastr.warning(response.data.message);
	            });
	            return defer.promise;
        	},

        	//UPDATE USER NOTIFICATIONS
	    	updateUserNotifications: function(user){
	            var defer = $q.defer();
	            $http({
	            method: 'PATCH',
	            data:{

			        'eNewMatchNotification': user.eNewMatchNotification,
			        'eMessageNotification': user.eMessageNotification,
			        'eMessageLikesNotification': user.eMessageLikesNotification,
			        'eSuperLikesNotification': user.eSuperLikesNotification
	            },
	            url: 'api/user/update/'+user.iUserID
	            }).then(function successCallback(response) {
	                toastr.success(response.data.message);
	                return response;
	            }, function errorCallback(response) {
	                toastr.warning(response.data.message);
	            });
	            return defer.promise;
        	},

        	//CONTACT US
	    	contactUsMail: function(contactUs){
	            var defer = $q.defer();
	            $http({
	            method: 'POST',
	            data:{

			        'email':contactUs.email,
			        'message':contactUs.description,
			        'name':contactUs.name
	            },
	            url: 'api/contact-us'
	            }).then(function successCallback(response) {
	                toastr.success(response.data.message);
	                return response;
	            }, function errorCallback(response) {
	                toastr.warning("Error");
	            });
	            return defer.promise;
        	},
            checkOrder: function(id){
                var defer = $q.defer();
                $http({
                    method: 'GET',
                    data: {


                    },
                    url: 'api/admin/order/user/'+id
                }).then(function successCallback(response) {
                    defer.resolve(response);

                }, function errorCallback(response) {
                    defer.reject(response);

                });
                return defer.promise;

            }
    	}
});
