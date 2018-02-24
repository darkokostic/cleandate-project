'use strict';

angular.module('myApp.admin_home_service', ['ngRoute'])
	.service('AdminHomeService', function ($http,$q,toastr) { 

		return{
			
			// DASHBOARD STATISTIC
			getDashboardStatistic: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/dashboard'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // Requests for Varification
			getRequestsforvarification: function(year){
	            var defer = $q.defer();
	            $http({
	            method: 'POST',
	            data:{
	            	'year':year
	            },
	            url: 'api/admin/joind_users'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // DASHBOARD VERIFICATION
			getDashboardVerification: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/verify-list'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // DASHBOARD VERIFICATION APPROVE
			getDashboardVerificationApprove: function(id){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/verify/approve/'+id
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                toastr.success("Successfully");
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	                toastr.warning("Error");
	            });
	            return defer.promise;
	        },

	         // DASHBOARD VERIFICATION DENIED
			getDashboardVerificationDenied: function(id){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/verify/denied/'+id
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                toastr.success("Successfully");
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	                toastr.warning("Error");
	            });
	            return defer.promise;
	        }
	    }
});
