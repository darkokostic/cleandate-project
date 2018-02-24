'use strict';

angular.module('myApp.manage_pages_service', ['ngRoute'])
  	.service('ManagePagesService', function ($q,$http) { 
  		return{
			
			// MANAGE PAGES GET
			getManagePages: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: "api/admin/pages/list"
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        updatePage: function(page){
	            var defer = $q.defer();
	            $http({
	            method: 'PATCH',
	            data:{
	            	'tContent':page.tContent,
	            	'vPageTitle':page.vPageTitle
	            },
	            url: "api/admin/pages/edit/"+page.iPageID
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
