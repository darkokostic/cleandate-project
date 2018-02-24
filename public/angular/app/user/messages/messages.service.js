'use strict';

angular.module('myApp.messages_service', ['ngRoute'])
  .service('MessagesService', function ($q,$http) {
  return{
      getUsers: function(){
          var defer = $q.defer();
          $http({
              method: 'GET',
              data:{

              },
              url: 'api/user/list/people'
          }).then(function successCallback(response) {
              defer.resolve(response);
              return response;
          }, function errorCallback(response) {
              defer.reject(response);
          });
          return defer.promise;
      },
      getMessages: function(user){
          var defer = $q.defer();
          $http({
              method: 'POST',
              data:{
                  'receiver_id' : user.iUserID
              },
              url: 'api/user/message/list'
          }).then(function successCallback(response) {
              defer.resolve(response);
              return response;
          }, function errorCallback(response) {
              defer.reject(response);
          });
          return defer.promise;
      },
      sendMessage: function(msg,id){
          var defer = $q.defer();
          $http({
              method: 'POST',
              data:{
                  'receiver_id' : id,
                  'message': msg

              },
              url: 'api/user/message/send'
          }).then(function successCallback(response) {
              defer.resolve(response);
              return response;
          }, function errorCallback(response) {
              defer.reject(response);
          });
          return defer.promise;
      },
  }
});
