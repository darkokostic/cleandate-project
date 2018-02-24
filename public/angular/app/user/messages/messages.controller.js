'use strict';

angular.module('myApp.messages', ['ngRoute'])

.controller('MessagesCtrl', ['$scope','MessagesService','$timeout',function($scope,MessagesService,$timeout) {

    $scope.users = [];
    $scope.allUsers = [];
    $scope.selectedUser = {};
    $scope.messages = [];

    $scope.foramtDate = function (date) {
        var d = new Date();
        var s = new Date(date + ' UTC');
        return s.getTime() ;
    }
    var scrolled = false;
        $scope.scroll = function updateScroll(){
            if(!scrolled){
                var element = document.getElementById("scrollDown");
                element.scrollBottom = element.scrollHeight;
            }
        }

    $("#scrollDown").on('scroll', function(){
            scrolled=true;
    });
    var responseUsers = MessagesService.getUsers();
    var socket = io('http://cleandate.com:3000');
    socket.on('chat-channel.*:App\\Events\\ChatEvent', function (response) {
        $scope.$apply(function() {
            var msg = response.data.message;
            console.log(msg)
            if ($scope.selectedUser.iUserID == msg.user_id){

                $scope.messages.push(msg);
                $timeout(function() {
                    var scroller = document.getElementById("scrollDown");
                    scroller.scrollTop = scroller.scrollHeight;
                }, 0, false);

            }else if($scope.user.iUserID == msg.user_id){
                $scope.messages.push(msg);
                $timeout(function() {
                    var scroller = document.getElementById("scrollDown");
                    scroller.scrollTop = scroller.scrollHeight;
                }, 0, false);
            }

            var i = 0;
            angular.forEach($scope.users, function(value, key) {
                if (value.iUserID == msg.user_id){
                    value.newMSG = true;
                    $scope.users[i] = value;
                }
            });

        });
    });
    responseUsers.then(function(response) {
            $scope.allUsers = response.data.entity;
            $scope.users = $scope.allUsers;
            $scope.selectedUser = response.data.entity[0];
        },
        function(response) {
        });
    $scope.selectChat = function (user) {
        $scope.selectedUser = user;
        var messages = MessagesService.getMessages(user);
        messages.then(function(response) {
                $scope.messages = response.data.entity;
            },
            function(response) {
            });
    }
    $scope.sendMsg= function (msg,id) {
        var messages = MessagesService.sendMessage(msg,id);
        $scope.msg_for_sending = "";
        messages.then(function(response) {
            },
            function(response) {
            });
    }
    $scope.search = function (search_key) {
        search_key = search_key.toLowerCase();
        if (search_key == ""){
            $scope.users = $scope.allUsers;
        }else {
            var userList = [];
            angular.forEach($scope.users, function(value, key) {
                if (value.vFirstName.toLowerCase().includes(search_key) || value.vLastName.toLowerCase().includes(search_key)){
                    userList.push(value);
                }
            });
            $scope.users = userList;
        }


    }
}]);