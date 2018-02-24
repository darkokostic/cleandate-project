'use strict';

angular.module('myApp.main_service', ['ngRoute','toastr'])
	.service('MainService', function ($http,$q,toastr,$location) {
		return{

			// MY PROFILE VIEW
		  	headerInformations: function(){
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
	    	}
	    }

});
