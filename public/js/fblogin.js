$('.login-fb-btn').click(function(e) {

	    e.preventDefault();

		$('#myModal').modal('hide');

		FBLogin();

});



(function(d, s, id) {



	var js, fjs = d.getElementsByTagName(s)[0];



	if (d.getElementById(id)) return;



	js = d.createElement(s);



	js.id = id;



	js.src = "//connect.facebook.net/en_US/sdk.js";



	fjs.parentNode.insertBefore(js, fjs);



}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {



	FB.init({

		appId: '1316232548412248',

		cookie: true, 

		xfbml: true, 

		version: 'v2.3' 

	});

	FB.getLoginStatus(function(response) {

		statusChangeCallback(response);

	});

};

	function statusChangeCallback(response) {







		if (response.status === 'connected') {



		} else if (response.status === 'not_authorized') {



			alert('Please log into this app.');



		} else {



			//alert('Please log into facebook');



		}



	}

	function checkLoginState() {



		FB.getLoginStatus(function(response) {

			statusChangeCallback(response);

		});

	}

	function FBLogin() {

		FB.login(function(response) {

			if (response.authResponse) {

				getUserInfo(); //Get User Information.

			} else {

				alert('Authorization failed.');

			}

		}, {

			scope: 'public_profile,email,user_location,user_about_me,user_birthday,user_work_history,user_relationship_details'

		});



	}

	function getUserInfo() {
	
		 FB.api('/me',{fields: 'about,picture.width(2048),birthday,email,first_name,last_name,gender,location,work'}, function(response) {
	console.log(response)
		
			var email = "";
			if (typeof response.email == "undefined") {
				email = "";
			} else {
				email = response.email;
			}
			var bdate=(typeof response.birthday == "undefined")?response.birthday:"";
			
			if(response.hasOwnProperty("birthday")){
				var dta=response.birthday.split("/");
				var bda=dta[2]+'-'+dta[0]+'-'+dta[1]
			}
			bda = new Date(bda);
			var today = new Date();
			var age = Math.floor((today-bda) / (365.25 * 24 * 60 * 60 * 1000));
			
			
			var about=(response.hasOwnProperty("about"))?response.about:"";
			var work=(response.hasOwnProperty("work"))?response.work[0].position.name:"";
			var location=response.hasOwnProperty("location")?response.location.name:"";
			
			var Fname = response.first_name;
			var Lname = response.last_name;
			var Email = response.email;
			var Username = response.id;
			var gender = response.gender;
			var Pic = response.picture.data.url;
			console.log(location);
			call({url:"user/create",
				  params:{
					  'Fname':Fname,
					  'Lname':Lname,
					  'Email':Email,
					  'Username':Username,
					  'Pic':Pic,
					  'gender':gender,
					  'about':about,
					  'occupation':work,
					  'age':age,
					  'location':location
					  },
			type:'POST'},function(resp){
					call({url:"site/sociallogin",params:{'LoginForm[username]':resp.username,'LoginForm[password]':resp.password},type:'POST',dataType : 'html'},function(respNew){

						if(respNew.ustatus=="DEACTIVE"){

							$('#alertModal').find('#error-text').html('Your account was suspended.');

							$('#alertModal').modal('show');

							return false

						}

						if(respNew.status==true){

							window.location.href = baseurl+'user/member';

						}else{

							alert('Oops Failed To Login.')

						}

					});

			});

		});



	}

