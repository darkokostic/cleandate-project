'use strict';

angular.module('myApp.main', ['ngRoute'])


.controller('MainCtrl', ['$scope','$location','MainService','$rootScope', function($scope,$location,MainService,$rootScope) {
    
    $scope.checkForAdminLogin=function() {
        if($location.path()=='/admin/login'){
            return true;
        }
    }

    $scope.logout=function() {
        Cookies.expire('user');
        Cookies.expire('role');
        $location.path('/home');
    }
	// ACTIVE TABS
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.loginOnPages = false;
    if($location.path()=='/how_it_works' || $location.path()=='/terms' || $location.path()=='/policy') {
    	$scope.loginOnPages = false;
    }
    else {
    	$scope.loginOnPages = true;
    }
    $scope.checkLocation=function() {
        if($location.path()=='/admin' || $location.path().substring(0,6)=='/admin' || $location.path()=='/user' || $location.path().substring(0,5)=='/user'){
            return false;
        }
        else {
            return true;
        };
    }
    $scope.checkLocationAdmin=function() {
        if($location.path()=='/admin/login'){
            return null;
        }
        if($location.path()=='/admin' || $location.path().substring(0,6)=='/admin'){
            return true;
        }
        else {
            return false;
        };
    }
    $scope.checkLocationUser=function() {
        if($location.path()=='/user' || $location.path().substring(0,5)=='/user'){
            return true ;
        }
        else {
            return false;
        };
    }
    // LOGIN MODAL GO TO TERMS AND POLICY
    $scope.goToPolicy = function() {
        $location.path('/policy')
    }
    $scope.goToTerms = function() {
        $location.path('/terms')
    }

    var responseSelf = MainService.headerInformations();
    responseSelf.then(function(response){
        $scope.user=response.data.entity;
    },
    function(response){
    }).catch(function(error) {
    });

}]);