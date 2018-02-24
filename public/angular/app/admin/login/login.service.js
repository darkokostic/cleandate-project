'use strict';

angular.module('myApp.login_service', ['ngRoute'])
  .service('LoginService', function ($q,$http,Cookies,toastr) { 
	  return{

        // USER SINGLE VIEW
		loginAdmin: function(admin){
            var defer = $q.defer();
            $http({
            method: 'POST',
            data:{
            	'vEmail':admin.email,
            	'vPassword':admin.password
            },
            url: 'api/admin/login'
            }).then(function successCallback(response) {
            	Cookies.set('role',"Admin");
                Cookies.expire('user');
                Cookies.set('user',response.data.entity.token);
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
