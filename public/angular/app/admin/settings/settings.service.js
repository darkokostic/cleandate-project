'use strict';

angular.module('myApp.settings_admin_service', ['ngRoute'])
  	.service('SettingsAdminService', function ($q,$http,toastr) { 
  		return{
			
			// MANAGE PAGES GET
			getAdminSettings: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: "api/admin/footer-list"
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        //edit
			edit: function(edit){
	            var defer = $q.defer();
	            $http({
	            method: 'PATCH',
	            data:{
	            	'android' :edit.android,
	            	'content' :edit.content,
	            	'created_at' : edit.created_at,
	            	'facebook' :edit.facebook,
	            	'google' :edit.google,
	            	'id' :edit.id,
	            	'ios' :edit.ios,
	            	'mail' :edit.mail,
	            	'tumbler' :edit.tumbler,
	            	'twitter' :edit.twitter,
	            	'updated_at' :edit.updated_at,
	            	'youtube' :edit.youtube	
	            },
	            url: "api/admin/footer/edit/"+edit.id
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                toastr.success(response.data.message);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	                toastr.warning(response.data.message);
	            });
	            return defer.promise;
	        }
	    }
});
