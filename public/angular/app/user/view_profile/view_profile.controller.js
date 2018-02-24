'use strict';

angular.module('myApp.viewProfile', ['ngRoute'])

.controller('ViewProfileCtrl', ['ViewProfileService','$scope', function(ViewProfileService,$scope) {

	$scope.userProfileId = [];
	$scope.dataSingleUserView = [];
	$scope.publicImagesUser = [];

	$scope.initSingleMemberView = function() {
		// SINGLE VIEW MEMBERS
		var responseSingleViewMembers = ViewProfileService.getSingleViewMembers(Cookies.get('currUserForView'));
			responseSingleViewMembers.then(function(response) {
				$scope.dataSingleUserView = response.data.entity;
                    console.log($scope.dataSingleUserView.dUpdatedDateTime);
				$scope.dataSingleUserView.dUpdatedDateTime = Date.parse($scope.dataSingleUserView.dUpdatedDateTime);
				if (isNaN($scope.dataSingleUserView.dUpdatedDateTime)){
                    $scope.dataSingleUserView.dUpdatedDateTime = 0;
				}
                    console.log($scope.dataSingleUserView.dUpdatedDateTime);
				$scope.dataSingleUserView.dAddedDateTime = Date.parse($scope.dataSingleUserView.dAddedDateTime);
                    if (isNaN($scope.dataSingleUserView.dAddedDateTime)){
                        $scope.dataSingleUserView.dAddedDateTime = 0;
                    }
				console.log($scope.dataSingleUserView.dAddedDateTime);
				$scope.publicImagesUser = response.data.entity.images;
				  var geocoder = new google.maps.Geocoder;
				  var input = $scope.dataSingleUserView.dLatitude+','+$scope.dataSingleUserView.dLongitude;
				  var latlngStr = input.split(',', 2);
				  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
				  geocoder.geocode({'location': latlng}, function(results, status) {
				    if (status === 'OK') {
				      if (results[1]) {
				      	for (var i = 0; i < results.length; i++) {
					      	if (results[i].types.indexOf("administrative_area_level_1") >= 0 || results[i].types.indexOf("locality") >= 0) {
				            	$scope.dataSingleUserView.city = results[i].address_components[0].long_name;
				            }
				            if (results[i].types.indexOf("country") >= 0) {
				            	$scope.dataSingleUserView.country = results[i].address_components[0].long_name;
				            }
				      	}
				      } 
				    }
				  });
		  	},
		  	function(response) {

		  	});
  	}

  	//FAORITE USER
  	$scope.makeUserFavorite = function() {
  		$scope.favoriteUser = $scope.dataSingleUserView.iUserID;
  		var responseFavoriteUser = ViewProfileService.favoriteUser($scope.favoriteUser);
			responseFavoriteUser.then(function(response) {
		  	},
		  	function(response) {

		  	});
  	}
}]);