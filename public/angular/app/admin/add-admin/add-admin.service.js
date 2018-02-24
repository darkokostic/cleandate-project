'use strict';

angular.module('myApp.add_admin_service', ['ngRoute'])
  	.service('AddAdminService', function ($http,toastr,$location) { 
  		return {
	  		// ADD ADMIN
	        addAdmin: function(admin){
	        	$http({
	            method: 'POST',
	            data: {
	            	'vFirstName': admin.name,
	            	'vLastName': admin.userName,
					'vEmail': admin.email,
					'vPassword': admin.password
	            },
	            url: 'api/create/admin'
	    	    }).then(function successCallback(response) {
	    	    	toastr.success(response.data.message);
	    	    	$location.path('/admin/admin-list');

	    	    }, function errorCallback(response) {
	    	    	toastr.warning(response.data.message);
	    	  	});
        	}
        }
});
