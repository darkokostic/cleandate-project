'use strict';

angular.module('myApp.faq_list_service', ['ngRoute'])
  	.service('FaqListService', function ($q,$http,toastr) { 
  		return{
			
			// FAQ LIST
			getFaqList: function(){
	            var defer = $q.defer();
	            $http({
	            method: 'GET',
	            data:{

	            },
	            url: "api/admin/faq-list"
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },

	        //DELETE FAQ
	        httpDeleteFaq: function(Id) {
	            var defer = $q.defer();
	            $http({
	                method: 'DELETE',
	                url: 'api/admin/faq/delete/'+Id
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
	        //GET CATEGORIES
	        
	        getCategories: function() {
	            var defer = $q.defer();
	            $http({
	                method: 'GET',
	                url: 'api/admin/category-list'
	            }).then(function successCallback(response) {
                    defer.resolve(response);
                return response;
	            }, 
	            function errorCallback(response) {
                    defer.reject(response);
	            });
	        return defer.promise;
	        },
	        //EDIT FAQ
	        editFaqu: function(faqu) {
	            var defer = $q.defer();
	            $http({
	                method: 'PATCH',
	                data:{
                		'category_id' : faqu.category_id,
                		'question' : faqu.question,
                		'answer' : faqu.answer
	                },
	                url: 'api/admin/faq/edit/'+faqu.id
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
