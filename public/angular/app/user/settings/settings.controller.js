'use strict';

angular.module('myApp.settings', ['ngRoute', 'ngFileUpload'])

.controller('SettingsCtrl', ['SettingsService','$scope','Cookies','$location','Upload','$timeout', function(SettingsService,$scope,Cookies,$location,Upload,$timeout) {
	$scope.activeDiscoveryPreference = true;
	$scope.activeWebProfile = false;
	$scope.activeNotification = false;
	$scope.activeAppSetting = false;
	$scope.activeVerifyYourIdentity = false;
	$scope.distance=500;
	$scope.age=[];
	$scope.age.minimum=18;
	$scope.age.maximum=100;
	$scope.aboutUserSettingsEdit = [];
	$scope.dataContactUs = [];
	$scope.hasOrderd = false;

	$scope.user=[];
	var responseSelf = SettingsService.self();
	responseSelf.then(function(response){
		$scope.user=response.data.entity;
		$scope.minRangeSlider.minValue = $scope.user.iAgeRangeFrom;
		$scope.minRangeSlider.maxValue = $scope.user.iAgeRangeTo;
		if($scope.user.eDiscoverMe == 'Yes') {
			$scope.user.eDiscoverMe = true;
		}
		if($scope.user.eDiscoverMe == 'No') {
			$scope.user.eDiscoverMe = false;
		}

		if($scope.user.eNewMatchNotification == 'Yes') {
			$scope.user.eNewMatchNotification = true;
		}
		if($scope.user.eNewMatchNotification == 'No') {
			$scope.user.eNewMatchNotification = false;
		}

		if($scope.user.eMessageNotification == 'Yes') {
			$scope.user.eMessageNotification = true;
		}
		if($scope.user.eMessageNotification == 'No') {
			$scope.user.eMessageNotification = false;
		}

		if($scope.user.eMessageLikesNotification == 'Yes') {
			$scope.user.eMessageLikesNotification = true;
		}
		if($scope.user.eMessageLikesNotification == 'No') {
			$scope.user.eMessageLikesNotification = false;
		}

		if($scope.user.eSuperLikesNotification == 'Yes') {
			$scope.user.eSuperLikesNotification = true;
		}
		if($scope.user.eSuperLikesNotification == 'No') {
			$scope.user.eSuperLikesNotification = false;
		}
		var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.user.dLatitude+","+$scope.user.dLongitude+"&key=AIzaSyBnICk37tkvyjby446VXMfe1c0-A34AUHU";

		$.getJSON(geocodingAPI, function (json) {
		     if (json.status == "OK") {
		         var result = json.results[0];
		         var city = "";
		         var state = "";
		         for (var i = 0, len = result.address_components.length; i < len; i++) {
		             var ac = result.address_components[i];
		            if (ac.types.indexOf("administrative_area_level_1") >= 0 || ac.types.indexOf("locality") >= 0 ) {
		            	$scope.user.city = ac.long_name;
		            }
		            if (ac.types.indexOf("country") >= 0) {
		            	$scope.user.country = ac.long_name;
		            }
		         }
		     }

		 });
            var responseOrder = SettingsService.checkOrder($scope.user.iUserID);
            responseOrder.then(function(response){

                    $scope.hasOrderd = true;
                },
                function(response){
                });
  	},
  	function(response){
  	});



	//LABEL SLIDER
    $scope.slider = {
	  	options: {
	    	floor: 0,
	    	ceil: 900
	  	}
	};

	//LABEL SLIDER
	$scope.minRangeSlider = {

        options: {
            floor: 18,
            ceil: 100,
            step: 1
        }
    };

    $scope.uploadVerifyFiles = function(file, errFiles) {

        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
            	method: 'POST',
                url: 'api/user/verify',
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

	$scope.goToDiscoveryPreference = function() {
		$scope.activeDiscoveryPreference = true;
		$scope.activeWebProfile = false;
		$scope.activeNotification = false;
		$scope.activeAppSetting = false;
		$scope.activeVerifyYourIdentity = false;
	}
	$scope.goToWebProfile = function() {
		$scope.activeDiscoveryPreference = false;
		$scope.activeWebProfile = true;
		$scope.activeNotification = false;
		$scope.activeAppSetting = false;
		$scope.activeVerifyYourIdentity = false;
	}
	$scope.goToNotification = function() {
		$scope.activeDiscoveryPreference = false;
		$scope.activeWebProfile = false;
		$scope.activeNotification = true;
		$scope.activeAppSetting = false;
		$scope.activeVerifyYourIdentity = false;
	}
	$scope.goToAppSetting = function() {
		$scope.activeDiscoveryPreference = false;
		$scope.activeWebProfile = false;
		$scope.activeNotification = false;
		$scope.activeAppSetting = true;
		$scope.activeVerifyYourIdentity = false;
	}
	$scope.goToVerifyYourStatus = function() {
		$scope.activeDiscoveryPreference = false;
		$scope.activeWebProfile = false;
		$scope.activeNotification = false;
		$scope.activeAppSetting = false;
		$scope.activeVerifyYourIdentity = true;
	}

	$scope.deleteYourAcc = function() {
		var responseDeleteAcc = SettingsService.deleteAcc();
		responseDeleteAcc.then(function(response){
			Cookies.expire('role');
			Cookies.expire('user');
			$location.path('/home');
	  	},
	  	function(response){
	  	});
	}

	//UPDATE USER SETTINGS
	$scope.SaveUpdateUserSettings = function(user) {
		$scope.aboutUserSettingsEdit = user;
		$scope.aboutUserSettingsEdit.iAgeRangeFrom = $scope.minRangeSlider.minValue;
		$scope.aboutUserSettingsEdit.iAgeRangeTo = $scope.minRangeSlider.maxValue;
		if ($scope.aboutUserSettingsEdit.eDiscoverMe == 0) {
			$scope.aboutUserSettingsEdit.eDiscoverMe = 'No';
		};
		SettingsService.updateSettings($scope.aboutUserSettingsEdit);
	}

	//UPDATE USER NOTIFICATION
	$scope.SaveUpdateUserNotifications = function(user) {
		$scope.aboutUserNotificationsEdit = user;
		if ($scope.aboutUserNotificationsEdit.eNewMatchNotification == 0) {
			$scope.aboutUserNotificationsEdit.eNewMatchNotification = 'No';
		};

		if ($scope.aboutUserNotificationsEdit.eMessageNotification == 0) {
			$scope.aboutUserNotificationsEdit.eMessageNotification = 'No';
		};

		if ($scope.aboutUserNotificationsEdit.eMessageLikesNotification == 0) {
			$scope.aboutUserNotificationsEdit.eMessageLikesNotification = 'No';
		};

		if ($scope.aboutUserNotificationsEdit.eSuperLikesNotification == 0) {
			$scope.aboutUserNotificationsEdit.eSuperLikesNotification = 'No';
		};
		SettingsService.updateUserNotifications($scope.aboutUserNotificationsEdit);
	}

	//MODAL CONTACT US
	$scope.sendMail = function(contactUs) {
		$scope.dataContactUs = contactUs;
		var responseContactUs = SettingsService.contactUsMail($scope.dataContactUs);
		responseContactUs.then(function(response){
	  	},
	  	function(response){
	  	});
	}



}]);