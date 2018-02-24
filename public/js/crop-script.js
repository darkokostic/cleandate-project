$(function($){

  var jcrop_api,

      boundx,

      boundy,

      $preview = $('#preview-pane'), jcrp;

 	 var jcrpholder = $('.jcrop-hldr').html();

  var jcropinit = function(){

		jcrp = $('#target').Jcrop({

		onChange: updatePreview,

		onSelect: updatePreview,

		bgOpacity: 0.5,

		aspectRatio: 1,

		//maxSize: [ 400, 400 ],

		//minSize: [ 400, 400 ]

	//	setSelect: [ 0, 0, 400, 400 ]

	  },function(){

		// Use the API to get the real image size

		var bounds = this.getBounds();

		boundx = bounds[0];

		boundy = bounds[1];

		jcrop_api = this;    

	  });

  };

  function updatePreview(c) {

    if (parseInt(c.w) > 0) {

      $('#x').val(c.x);

      $('#y').val(c.y);

      $('#w').val(c.w);

      $('#h').val(c.h);

    }

  }

  $('.file-upload').change(function(){

		readURL(this,'.my-profile','#my-profile-input')

	})

	$('.addPlus input').change(function(e) {

		var input=this;

		var file =$(this)[0].files[0]

		if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {

			$('<span class="editUpImages"><img src="'+e.target.result+'"/><span class="upCloseImg"><a href="#">x</a></span><input type="file"  value="'+file+'" name="OTHER_PIC[]" class="file-upload-edit"></span>').insertBefore('.addPlus');

        }

        reader.readAsDataURL(input.files[0]);

    }

        

    });

	$(document).on('click','.upCloseImg',function(e) {		

		var th=$(this);        

		var PIC_ID=$(this).attr('data-pid');

		call({url:"user/deletepic",params:{'PIC_ID':PIC_ID},type:'POST'},function(resp){

			th.parent('.editUpImages').hide();

		});

    });

	$('#file-input').change(function(e) {

		var input=this;

		var file =$(this)[0].files[0]

		if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {

			$('.jcrop-holder').find('img').attr('src',e.target.result);

			$('#cropbox').attr('src',e.target.result);

        }

        reader.readAsDataURL(input.files[0]);

		}

    });

    $(document).on('click','.addPlus',function (evt) {
		alert(1)
		$('#cropimg-user-profile').attr('id','cropimg');

	    $('#img').trigger('click')

    });

	$(document).on('change','#img',function (evt) {

		$('.file-holder').addClass('hide');

		//if($('.jcrop-holder').find('img:first-child').attr('src')!=""){

			

			var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

			if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {

				alert("Only formats are allowed : "+fileExtension.join(', '));

				return false;

			}else{

				$('#myModal-uploadPic').modal('show');

				$('#submit').show();		

				setTimeout(function(){

					jcrp = $('#target').data('Jcrop');		

					var tgt = evt.target || window.event.srcElement,

					files = tgt.files;

					if (FileReader && files && files.length) {

						var fr = new FileReader();

						fr.onload = function () {

							try{

								jcrop_api.setImage(fr.result);

								jcrop_api.setSelect([0, 0, 400, 400])

							}catch(err){

								  jcropinit();

								  jcrop_api.setImage(fr.result);

								  jcrop_api.setSelect([0, 0, 400, 400])

							}

						}

						fr.readAsDataURL(files[0]);

					}

				},1000);

		}

	});

	

	$(document).on('click','.upload-pic-close',function () {

 		$('#submit').hide();

	});	

	$(".change-profile-pic").on('click',function(e) {

		$('#myModal-uploadPic').find('form').attr('id',"cropimg-user-profile");

		$('#img').trigger('click');

	});

	$(document).on('submit',"#cropimg-user-profile",function(e) {

		$('.loader').show();

		e.preventDefault();

		$.ajax({

		url: changeProfilePic,

		dataType: 'json',		

		type: "POST",           

		data: new FormData(this), 

		contentType: false,       

		cache: false,         

		processData:false,        

		success: function(data)  

		{

			$('.jcrop-holder').find('img').attr('src','');;

			$('.my-profile').attr('src',data.src);

			$('.usr-img').attr('src',data.src);

			

			$('.loader').hide();

			$('.upload-pic-close').trigger('click');

		}

		});

	});

	$(document).on('submit',"#cropimg",function(e) {

		/*if($('#cropimg-user-profile').html()!=""|| typeof $('#cropimg-user-profile').html()!="undefined"){

	    alert($('#cropimg-user-profile').html());

		}*/

		$('.loader').show();

		e.preventDefault();

		$.ajax({

		url: uploadImgeUrl,

		dataType: 'json',		

		type: "POST",           

		data: new FormData(this), 

		contentType: false,       

		cache: false,         

		processData:false,        

		success: function(data)  

		{

				$('.jcrop-holder').find('img').attr('src','');;

			$('<span class="editUpImages"><img src="'+data.src+'" class="UpImages" alt=""><span class="upCloseImg" data-Pid="'+data.id+'"><a href="#">✕</a></span></span>').insertBefore('.addPlus');

			$('.upload-pic-close').trigger('click');

			$('.loader').hide();

			

		}

		});

	});

	

});