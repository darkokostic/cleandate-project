'use strict';

angular.module('myApp.cart_service', ['ngRoute'])
  .service('CartService', function ($q,$http) {
    return{
        checkOrder: function(id){
            var defer = $q.defer();
            $http({
                method: 'GET',
                data: {


                },
                url: 'api/admin/order/user/'+id
            }).then(function successCallback(response) {
                defer.resolve(response);

            }, function errorCallback(response) {
                defer.reject(response);

            });
            return defer.promise;

        }
    }
});
