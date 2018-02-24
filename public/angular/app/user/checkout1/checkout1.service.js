'use strict';

angular.module('myApp.checkout1_service', ['ngRoute'])
  	.service('Checkout1Service', function (toastr,$http,$location,$q) {

  		return {

			// CHECKOUT DATA
	        checkoutData: function(user,id){
                var defer = $q.defer();
	        	$http({
	            method: 'POST',
	            data: {
	            	'user_id': id,
			        'first_name': user.name,
			        'last_name': user.lastname,
			        'email': user.email,
			        'address': user.address,
			        'state': user.state,
			        'city': user.city,
			        'zipcode': user.zip,
			        'gender': user.gender,
			        'birthday': user.birth,
			        'phone': user.phone,
			        'note': user.notes
	                
	            },
	            url: 'api/user/checkout'
	    	    }).then(function successCallback(response) {
                    defer.resolve(response);
	    	    	toastr.success("Successfully sent");
	    	    }, function errorCallback(response) {
                    defer.reject(response);
	    	    	toastr.warning("Error");
	    	  	});
                return defer.promise;

	        }
        }
});
