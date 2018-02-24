'use strict';

angular.module('myApp.faq-list', ['ngRoute'])

.controller('FaqListCtrl', ['$scope','FaqListService', function($scope,FaqListService) {

	$scope.editFaqList = true;
	$scope.faqList=[];
	$scope.singleFaqu=[];
	$scope.categories=[];
	$scope.goToEditFaq = function(faq) {
		$scope.singleFaqu=faq;
		$scope.faqList=faq;
		tinymce.init({
		  selector: 'textarea',
		  height: 300,
		  width:1075,
		  theme: 'modern',
		  plugins: [
		    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		    'searchreplace wordcount visualblocks visualchars code fullscreen',
		    'insertdatetime media nonbreaking save table contextmenu directionality',
		    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
		  ],
		  toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		  toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
		  image_advtab: true,
		  templates: [
		    { title: 'Test template 1', content: 'Test 1' },
		    { title: 'Test template 2', content: 'Test 2' }
		  ],
		  content_css: [
		    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
		    '//www.tinymce.com/css/codepen.min.css'
		  ]
		 });
		$scope.editFaqList = false;
	}
	$scope.editFaqu = function(faqu) {
		FaqListService.editFaqu(faqu);
	}
	// FAQ LIST
	var responseFaqLists = FaqListService.getFaqList();
		responseFaqLists.then(function(response) {
			$scope.faqLists = response.data.entity.data;
			setTimeout(function() {
				$('#faqList').DataTable({
		            "dom": '<lf<t>ip>'
		        });
			}, 300);
	  	},
	  	function(response) {

	  	});

	  	var responseCat = FaqListService.getCategories();
		responseCat.then(function(response) {
			$scope.categories= response.data.entity;
	  	},
	  	function(response) {

	  	});

  	//DELETE FAQ
	$scope.deleteFaq = function(adminId,index) {
		var responseDeleteFaq = FaqListService.httpDeleteFaq(adminId);
		responseDeleteFaq.then(function(response){
			var arr = [];
			for (var i = 0 ; i < $scope.faqList.length; i++) {
				if(i != index){
					arr.push($scope.faqList[i]);
				}
			}
			$scope.faqList = arr;
		},
		function(response){
		});
	}
    $scope.formatDate = function (date) {
        if (isNaN(Date.parse(date))){
            return 0;
        }
        return Date.parse(date);
    }
	//Back to faq list
	$scope.BackToFaqList = function() {
		$scope.editFaqList = true;
        var responseFaqLists = FaqListService.getFaqList();
        responseFaqLists.then(function(response) {
                $scope.faqLists = response.data.entity.data;
                setTimeout(function() {
                    $('#faqList').DataTable({
                        "dom": '<lf<t>ip>'
                    });
                }, 300);
            },
            function(response) {

            });
	}
}]);