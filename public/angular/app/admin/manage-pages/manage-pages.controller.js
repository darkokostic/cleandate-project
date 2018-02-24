'use strict';

angular.module('myApp.manage-pages', ['ngRoute'])

.controller('ManagePagesCtrl', ['$scope','$location','ManagePagesService', function($scope,$location,ManagePagesService) {
    $scope.pageForEdit=[];
	$scope.editPages = true;
    $scope.tinymceModel = 'Initial content';

	$scope.goToEditPage = function(pageToEdit) {

        $scope.pageForEdit=pageToEdit;
         $scope.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          };
        	$scope.editPages = false;
        }

    // MANAGE PAGES GET
    var responseManagePagesGet = ManagePagesService.getManagePages();
        responseManagePagesGet.then(function(response) {
            $scope.managePages = response.data.entity.data;
        },
        function(response) {

        });
        $scope.setContent = function() {
        };

    $scope.editPage= function(page) {
        ManagePagesService.updatePage(page);
    }   
    $scope.check=function() {
    } 

    //BACK TO MANAGE LIST
    $scope.BackToManageList = function() {
        $scope.editPages = true;
    }
}]);