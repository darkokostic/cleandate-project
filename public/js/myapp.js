var call = function(data, callback) {

 if(data.noloader!="yes"){

 	$('.loader').show();

 }

 var callTry = function(data, callback) {

   var ajxOpts = {

    url: baseurl + data.url,

    data: data.params,

    dataType: 'json',

    crossDomain: true,

    cache: false,

    type: (typeof data.type != 'undefined' ? data.type : 'Get'),

   };

   if (typeof data.progress != 'undefined') {

    ajxOpts.xhr = function() {

     var myXhr = $.ajaxSettings.xhr();

     if (myXhr.upload) {

      myXhr.upload.addEventListener('progress', progress, false);

     }

     return myXhr;

    };

   }

   $.ajax(ajxOpts).done(function(res) {

	    $('.loader').hide();

    callback(res);

   }).fail(function(r) {

   	 $('.loader').hide();

   })

  }

  callTry(data, callback);

 }

 function initialize3() {

  //   autocomplete3 = new google.maps.places.Autocomplete(document.getElementById("location"), {

  //       types: ["geocode"]

  //   }), autocomplete3.addListener("place_changed", function() {

  //        var e = autocomplete3.getPlace(),

  //        o = e.geometry.location.lat();

  //       var t = e.geometry.location.lng();

  //       $("#Rlat").val(o)

  //       $("#Rlng").val(t);

  // $("#Rcity").val(e.address_components[0].long_name + "," + e.address_components[3].short_name);

  //       var a = new google.maps.LatLng(o, t);

  //       geocoder = new google.maps.Geocoder, geocoder.geocode({

  //           latLng: a

  //       }, function(e, o) {

  //           if (o == google.maps.GeocoderStatus.OK && e[0]){

  //               for (j = 0; j < e[0].address_components.length; j++) {

  //                   if ("postal_code" == e[0].address_components[j].types[0]){

  //     var t = e[0].address_components[j].short_name;

  //    }

  //                   $("#Rzip").val(t)

  //               }

  //  }

  //       })

  //   })

}

function readURL(input,id,inputid) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {

            $(id).attr('src', e.target.result);

			$(inputid).val(e.target.result);

        }

        reader.readAsDataURL(input.files[0]);

    }

}

$(document).ready(function(a) {

	$('#dp1').datepicker({
				format: 'mm-dd-yyyy'
			});
	if(true){

		initialize3();

	}

	
	// $('#checkout1').validate();
	// $('.form').validate();

	$('#search-string').keypress(function( event ) {

	  if ( event.which == 13 ) {

		 $('#search-btn').trigger('click');

	  }

	});

	$('.nav').click(function(){

		$('#search-string').val('');

	})

    $('#search-btn').click(function(e){

		e.preventDefault();

		var str= $('#search-string').val();

		if(str==""){

			 $('#1').trigger('click');

			 return false;

		}		

		call({url:"site/seachfaq",params:{'string':str},type:'POST'},function(resp){

				$('.in').removeClass('in active');

				$('.nav').removeClass('active');

				$('#search-tab').html(resp.html);

				$('#search-tab').addClass('active');

				$('#search-tab').addClass('in');

		});

	});

	$('#msg').keypress(function( event ) {

	  if ( event.which == 13 ) {

		 $('.btn-submit-popup').trigger('click');

	  }

	});

	// $('.contact-form').validate();

	

	$('.send-contact').click(function(e){

		e.preventDefault();

		if($('.contact-form').valid()){

			var formData=$('.contact-form').serialize();

			call({url:"site/contact",params:formData,type:'POST'},function(resp){

				$('.contact-form')[0].reset();

				$('.success').show();

			});

		}

	});

	$('.conatct-closepop').click(function(e){

			$('.success').hide();

	});

	

	$('#background-verified').change(function(e) {	

        var filename = $(this).val();

		var extension = filename.replace(/^.*\./, '');

        if (extension == filename) {

            extension = '';

        } else {            

            extension = extension.toLowerCase();

        }	

		if(extension!="jpg" && extension!="jpeg" && extension!="gif" && extension!="png"){

			$('#error-text').html('Sorry this file is not allowed');

			$('#alertModal').modal('show');

			return false;

		}

		 $("#upload-doc-form").submit();	

	});

	

	$('.set-seting-notification').submit(function(e) {

		e.preventDefault();

		

		var formData=$(this).serialize();

		call({url:"user/setNotification",params:formData,type:'POST'},function(resp){

			

		});

	});

	// $('.display-form').validate();

	$('.display-form').submit(function(e) {

		e.preventDefault();

		if(!$(this).valid()){

			return false;

		}

		var formData=$(this).serialize();

		call({url:"user/displayName",params:formData,type:'POST'},function(resp){

			$('.last-name').html($('input[name="DISPLAY_NAME"]').val())

		});

	});

	$('#upload-doc-form').submit(function(e) {
			$('.img-progress,.progress-div').removeClass('hide');	

			$('.file-drop').addClass('hide');			

		    var formData = new FormData(this);

			

			$.ajax({

				type:'POST',

				url: UploadDocumnet,

				data:formData,

				xhr: function() {

						var myXhr = $.ajaxSettings.xhr();
						if(myXhr.upload){
							console.log('Add');
							console.log(myXhr.upload);
							myXhr.upload.addEventListener('progress',progress, false);
						  
						}
 						return myXhr;
				
				},
				cache:false,

				contentType: false,

				processData: false,		

				success:function(data){
						$('.progress-area').hide();
						$('.img-progress,.progress-div').addClass('hide');	
						$('.file-drop').removeClass('hide');
						$('.very-status').html('<p class="vi-text color-info">Thank your for sending your idendity,now identity is under verification,we will response you soon.</p>');
						 $('.trytoupload').hide();

				},

				error: function(data){

					console.log(data);

				}

			});

   			e.preventDefault();

		

	});

});

function progress(e){ 

    if(e.lengthComputable){

        var max = e.total;

        var current = e.loaded;

        var Percentage = parseInt((current * 100)/max)+'%';		
		console.log(Percentage);
        $('.progress-area').css('width',Percentage);
		$('.progress-area').html(Percentage);

        if(Percentage >= 100)

        {

			

        }

    }  

}

$(function(){



    $('#cropbox').Jcrop({

      aspectRatio: 1,

      onSelect: updateCoords

    });



  });



  function updateCoords(c)

  {

    $('#x').val(c.x);

    $('#y').val(c.y);

    $('#w').val(c.w);

    $('#h').val(c.h);

  };



  function checkCoords()

  {

    if (parseInt($('#w').val())) return true;

    alert('Please select a crop region then press submit.');

    return false;

  };