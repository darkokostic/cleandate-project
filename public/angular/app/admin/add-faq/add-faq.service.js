'use strict';

angular.module('myApp.add_faq_service', ['ngRoute'])
  .service('AddFaqService', function ($q,$http,toastr) { 
  	
  	// ADD FAQ
  	return {
			addFaq: function(faq){
	            var defer = $q.defer();
	            $http({
	            method: 'POST',
	            data:{
	            	'answer':faq.answer,
	            	'question':faq.question,
	            	'category_id':faq.category_id
	            },
	            url: "api/admin/faq/create"
	            }).then(function successCallback(response) {
	                defer.resolve(response);
	                return response;
	            }, function errorCallback(response) {
	                defer.reject(response);
	            });
	            return defer.promise;
	        },
        addCategory: function(faq){
            var defer = $q.defer();
            $http({
                method: 'POST',
                data:{
                    'name':faq.name
                },
                url: "api/admin/category/create"
            }).then(function successCallback(response) {
                defer.resolve(response);
                return response;
            }, function errorCallback(response) {
                defer.reject(response);
            });
            return defer.promise;
        },
	        getCategories: function() {
	            var defer = $q.defer();
	            $http({
	                method: 'GET',
	                url: 'api/admin/category-list'
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
