'use strict';

angular.module('myApp.support', ['ngRoute'])

.controller('SupportCtrl', ['SupportService','$scope','SettingsService', function(SupportService,$scope,SettingsService) {
	$scope.categories=[];
	$scope.categories2=[];
	$scope.activeCategory=[];
	$scope.names='name1';
	$scope.questions='Q-.1 What About New Quest3 ?';
	$scope.answers='simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrytandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the','nown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the';
	
	$scope.names='name2';
	$scope.answers2='New answerambled it to make a type specimen book. It has survived not only five centuries, but also the','nown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the';
	$scope.questions2='Q-.1 What About Newquestionniiiindasfkslfmdfmsdl ?';
	
	$scope.category1=[];
	$scope.category1.name=$scope.names;
	$scope.category1.questions=$scope.questions;
	$scope.category1.answers=$scope.answers;

	$scope.category2=[];
	$scope.category2.name=$scope.names;
	$scope.category2.questions=$scope.questions2;
	$scope.category2.answers=$scope.answers2;

	$scope.categories.categoryName='Category 1';
	$scope.categories.push($scope.category1);
	$scope.categories.push($scope.category2);

	$scope.categories2.categoryName='Category 2';
	$scope.categories2.push($scope.category2);
	$scope.categories2.push($scope.category1);
	$scope.data=[];
	$scope.data.push($scope.categories);
	$scope.data.push($scope.categories2);
	$scope.activeCategory=$scope.data[0];

	$scope.changeActiveCat = function(category) {
		$scope.activeCategory=category;
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