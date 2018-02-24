'use strict';

angular.module('myApp.user_list_service', ['ngRoute'])
  	.service('UserListService', function ($q,$http,toastr) { 
  		return{
			
			// USER LIST
			getUserList: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/user-list'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        getUserListPagination: function(userId){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: userId
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // USER SINGLE VIEW
			getUserSingleView: function(id){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/member/' + id
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        // ADD NEW USER
	        addNewUser: function(user){
	        	$http({
	            method: 'POST',
	            data: {
	            	'vFirstName': user.name,
	            	'vUserName': user.username,
					'vEmail': user.email,
					'eGender': user.sex,
					'dDob': user.age,
					'vLastName': user.lastname
	                
	            },
	            url: 'api/admin/create/user'
	    	    }).then(function successCallback(response) {
	    	    	toastr.success(response.data.message);

	    	    }, function errorCallback(response) {
	    	    	toastr.warning(response.data.message);
	    	  	});
        	},
        	userSearch: function(search){
	        	$http({
	            method: 'POST',
	            data: {
	            	'gender': search.email,
	            	'active': search.email,
					'date' :{
						'from':search.searchDateToWrite.from,
						'to':search.searchDateToWrite.to
					} ,
					'name': search.name
	                
	            },
	            url: 'api/admin/user/search'
	    	    }).then(function successCallback(response) {
	    	    	toastr.success(response.data.message);

	    	    }, function errorCallback(response) {
	    	    	toastr.warning(response.data.message);
	    	  	});

	        }
	    }
});
