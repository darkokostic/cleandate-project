'use strict';

angular.module('myApp.settingsAdmin', ['ngRoute'])

.controller('SettingsAdminCtrl', ['$scope','$location','SettingsAdminService', function($scope,$location,SettingsAdminService) {
	var responseAdminSettings = SettingsAdminService.getAdminSettings();
        responseAdminSettings.then(function(response) {
            $scope.adminSettings = response.data.entity;
        },
        function(response) {

        });

    $scope.edit=function(edit) {
    	SettingsAdminService.edit(edit);
    }
}]);