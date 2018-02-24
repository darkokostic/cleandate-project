$(document).ready(function(e) {
	  var baseUrl = $('#baseUrl').val();
	  $('.wysihtml5').wysihtml5();
      $('.form-horizontal').validate();
	  $('#Faq_CATEGORY_NAME').change(function(){
	  	if($(this).val()=="0"){
			
			var html='<input class="form-control" required="required" name="Faq[CATEGORY_NAME]" id="Faq_CATEGORY_NAME_input"><p><a href="#" class="backtodrop"><i class="fa fa-repeat"></i></a></p>';
			$( html ).insertAfter( $(this) );
			$(this).hide();

		}	  	
	  })
	  $(document).on('click','.backtodrop',function(){
		  $('#Faq_CATEGORY_NAME_input').remove();
		  $(this).remove();
		  $('#Faq_CATEGORY_NAME').show();
		  $("#Faq_CATEGORY_NAME").val($("#Faq_CATEGORY_NAME option:first").val());
	  });
	  $(document).on('change','#changeyear',function(){
	 	var _this = $(this).val();
		$.ajax(
			{ 
			url: baseUrl+"/site/getyearwise", 
			data:{'year':_this},
			dataType:"json", 
			success: function(result){
				if(result.status == true){
       			 	$(".rep").html(result.html); 
				}
    		}});
	});
});