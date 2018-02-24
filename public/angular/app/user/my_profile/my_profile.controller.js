'use strict';

angular.module('myApp.myProfile', ['ngRoute', 'ngFileUpload'])

.controller('MyProfileCtrl', ['MyProfileService','$scope','$http','Upload','$timeout', function(MyProfileService,$scope,$http,Upload,$timeout) {

	$scope.closestMember = [];

	// UPLOAD IMAGE MY PROFILE
	$scope.uploadFiles = function(file, errFiles) {

        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
            	method: 'POST',
                url: 'api/user/image/edit',
                data: {image:file}
            });

            file.upload.then(function (response) {
            	$scope.user.tImage=response.data.entity.tImage;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    }

    // UPLOAD IMAGES VERIFY
    $scope.uploadImagesFiles = function(file, errFiles) {

        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
            	method: 'POST',
                url: 'api/user/image/upload',
                data: {images:[file]}
            });

            file.upload.then(function (response) {
            	$scope.user.tImage=response.data.entity.tImage;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    }
	// MY PROFILE VIEW
	$scope.user=[];
  	var vm = this;
	var responseSelf = MyProfileService.self();
	responseSelf.then(function(response){
		$scope.user=response.data.entity;
		$scope.user.dVerifiedDateTime = Date.parse($scope.user.dVerifiedDateTime);
		if (isNaN($scope.user.dVerifiedDateTime)){
            $scope.user.dVerifiedDateTime = 0;
		}
		$scope.user.dUpdatedDateTime =  Date.parse($scope.user.dUpdatedDateTime);
		if (isNaN($scope.user.dUpdatedDateTime)){
            $scope.user.dUpdatedDateTime = 0;
		}
		$scope.user.dAddedDateTime =  Date.parse($scope.user.dAddedDateTime);
		if(isNaN($scope.user.dAddedDateTime)){
            $scope.user.dAddedDateTime = 0;
		}
		  var geocoder = new google.maps.Geocoder;
		  var input = $scope.user.dLatitude+','+$scope.user.dLongitude;
		  var latlngStr = input.split(',', 2);
		  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
		  geocoder.geocode({'location': latlng}, function(results, status) {
		    if (status === 'OK') {
		      if (results[1]) {
		      	for (var i = 0; i < results.length; i++) {
			      	if (results[i].types.indexOf("administrative_area_level_1") >= 0 || results[i].types.indexOf("locality") >= 0) {
		            	$scope.user.city = results[i].address_components[0].long_name;
		            }
		            if (results[i].types.indexOf("country") >= 0) {
		            	$scope.user.country = results[i].address_components[0].long_name;
		            }
		      	}
		      } 
		    }
		  });
  	},
  	function(response){
  	});

	//MY PROFILE EDIT
	$scope.SaveUpdateUser = function(user) {
		$scope.aboutUserEdit = user;
		MyProfileService.updateUser($scope.aboutUserEdit);
	}

	//CLOSEST MEMBER
	var responseClosestMember = MyProfileService.getClosestMember();
	responseClosestMember.then(function(response){
		$scope.closestMember = response.data.entity;

		  var geocoder = new google.maps.Geocoder;
		  var input = $scope.closestMember.dLatitude+','+$scope.closestMember.dLongitude;
		  var latlngStr = input.split(',', 2);
		  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
		  geocoder.geocode({'location': latlng}, function(results, status) {
		    if (status === 'OK') {
		      if (results[1]) {
		      	for (var i = 0; i < results.length; i++) {
			      	if (results[i].types.indexOf("administrative_area_level_1") >= 0 || results[i].types.indexOf("locality") >= 0) {
		            	$scope.closestMember.city = results[i].address_components[0].long_name;
		            }
		            if (results[i].types.indexOf("country") >= 0) {
		            	$scope.closestMember.country = results[i].address_components[0].long_name;
		            }
		      	}
		      } 
		    }
		  });
			
  	},
  	function(response){
  	});
}]);