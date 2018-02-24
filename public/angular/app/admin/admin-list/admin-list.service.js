'use strict';

angular.module('myApp.admin_list_service', ['ngRoute'])
  	.service('AdminListService', function ($q,$http,toastr) { 
  		return{
			
			// ADMIN LIST
			getAdminList: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: 'api/admin/list-admin'
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        //DELETE ADMIN
	        httpDeleteNews: function(Id) {
	            var defer = $q.defer();
	            $http({
	                method: 'DELETE',
	                url: 'api/admin/delete/'+Id
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


			//SAVE EDITS FOR SINGLE ADMIN
	        updateAdmin: function(admin){
	        	$http({
	            method: 'PATCH',
	            data: {
	            	'vEmail': admin.vEmail,
	            	'vPassword': admin.vPassword,
					'vLastName': admin.vLastName,
					'vFirstName': admin.vFirstName
	                
	            },
	            url: 'api/admin/update/'+admin.iAdminID
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
	            	'vEmail': search.email,
					'vUserName': search.vLastName,
					'date' :{
						'from':search.searchDateToWrite.from,
						'to':search.searchDateToWrite.to
					},
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
