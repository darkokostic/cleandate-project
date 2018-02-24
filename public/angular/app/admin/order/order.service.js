'use strict';

angular.module('myApp.order_admin_service', ['ngRoute'])
  	.service('OrderAdminService', function ($q,$http,toastr) { 
  		return{
			
			// ORDER LIST
			getOrderList: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/order/list'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },


	        //DELETE ORDER
	        httpDeleteOrder: function(Id) {
	            var defer = $q.defer();
	            $http({
	                method: 'DELETE',
	                url: 'api/admin/order/delete/'+Id
	            }).then(function successCallback(response) {
                    defer.resolve(response);
                    toastr.success(response.data.message);
                return response;
	            }, 
	            function errorCallback(response) {
                    defer.reject(response);
                    toastr.warning(response.data.message);
	            });
	        return defer.promise;
	        },


	        // ORDER APPROVED
			approvedOrder: function(id){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/order/competed/' + id
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                toastr.success(response.data.message);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	                toastr.warning(response.data.message);
	            });
	            return defer.promise;
	        },

	        //DELETE ORDER
	        deniedOrder: function(Id) {
	            var defer = $q.defer();
	            $http({
	                method: 'DELETE',
	                url: 'api/admin/order/delete/'+Id
	            }).then(function successCallback(response) {
                    defer.resolve(response);
                    toastr.success(response.data.message);
                return response;
	            }, 
	            function errorCallback(response) {
                    defer.reject(response);
                    toastr.warning(response.data.message);
	            });
	        return defer.promise;
	        }
	    }
});
