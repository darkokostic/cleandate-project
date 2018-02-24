var makeScroll=function(){

	 if($('.myconversation._ACTIVE_').length > 0){ 

   		$('.myconversation._ACTIVE_').css('height',window.innerHeight - $('.myconversation._ACTIVE_').offset().top);

	 

	   $('.overflow').css('height',window.innerHeight - $('.overflow').offset().top);

	   if(window.innerWidth > 767){

			$('.chat-usr-list').css('height',window.innerHeight - $('.overflow').offset().top);

		}

	   $('.myconversation._ACTIVE_').find('.conversation_holder').css('height',window.innerHeight - $('.myconversation._ACTIVE_').find('.conversation_holder').offset().top-$('.chat-input-holeder').outerHeight());

		setTimeout(function(){

			 $('.myconversation._ACTIVE_').find('.conversation_holder').animate({

					scrollTop: $('.myconversation._ACTIVE_').find('.conversation_holder')[0].scrollHeight 

					-$('.myconversation._ACTIVE_').find('.conversation_holder')[0].clientHeight

			  }, 1000);

		},1000);

	}

	return ;

			

}



var makeDate=function(){

	var hours = new Date().getHours();

	var Min=new Date().getMinutes();

	Min=Min<10?'0'+Min:Min;	

	var n=hours;

	if(hours > 12){

		 n=hours-12;	

	}

	n=n<10?'0'+n:n;	

	hours = n > 12 ? n-12+':'+Min+''+'AM' :n +':'+Min+' PM';

	return hours;

}

var Notified=[]; var MainCount=0;

var continueAjax=function(){

	var formData="";

	call({url:"chat/continueAjax",params:formData,type:'POST',noloader:"yes"},function(resp){

		   //$('.pop-up-match').show();

			if(resp.ustatus=="DEACTIVE"){

				

				$('#alertModal').find('#error-text').html('Your account has been suspended by admin.');

				$('#alertModal').modal('show');

				setTimeout(function(){

				window.location.href = logoutUrl; 

				},7000);

				return false

			}

			

			if(resp.status==true){

				jQuery.each( resp.messages, function( i, val ) {

					

					if($('#message-'+val.MESSAGE_ID).length==0){

						var activeChat_User=0;

						if($('#'+val.SENDER_ID).hasClass('_ACTIVE_')){ //active User

						

							if(val.SEND_BY_ME=="YES"){

								    var sender_html='<div class="rec_row text-right clearfix" ';

									sender_html+='id="message-'+val.MESSAGE_ID+'">';

									sender_html+='<div class="text-bg append">'+val.MESSAGE+'</div>'

									sender_html+='</div>';

									$('#'+val.RECEIVER_ID).find('.conversation_holder').append(sender_html);

									activeChat_User=val.RECEIVER_ID;

									makeScroll();

							}else{

								 var received_html='<div class="send_row text-left clearfix " ';

									 received_html+='id="message-'+val.MESSAGE_ID+'">';

									 received_html+='<span class="img-holder">';

									 received_html+='<img src="'+val.SENDER_PIC+'" alt=""></span>';

									 received_html+='<div class="text-bg append">'+val.MESSAGE+'</div></div>';

									 $('#'+val.SENDER_ID).find('.conversation_holder').append(received_html);

									

									 activeChat_User=val.SENDER_ID;

									 $( "li[data-id='"+val.SENDER_ID+"']" ).

										find('.last-msg').html(val.MESSAGE);

										$( "li[data-id='"+val.SENDER_ID+"']" ).

										find('.time').html(val.TIME);

										 makeScroll();

							 }

							 if($('#'+activeChat_User).find('.get-started-block').length!=0){

								$('#'+activeChat_User).find('.conversation_holder').removeClass('hide');

								$('#'+activeChat_User).find('.get-started-block').addClass('hide');

							 }

						}else{//non-active User

							

							if(val.SEND_BY_ME!="YES"){

									if(jQuery.inArray(val.MESSAGE_ID, Notified) !== -1){

									 

									}else{

										var msg=$( "li[data-id='"+val.SENDER_ID+"']" ).

												find('.contact-msg-count').text()

										if(msg!=""){

											msgC=parseInt(msg)+1;									

										}else{

											msgC=1;

										}

										var frontMessage=$('#message-count').text();

									

										if(frontMessage!=""){

											var frontMessageC=parseInt(frontMessage)+1;									

										}else{

											var frontMessageC=1;

										}

										if(isNaN(frontMessageC)) {

											 frontMessageC=1;

										}

										$('#message-count').html(frontMessageC);

										$("#message-count").removeClass('hide');

										// for notification//

										$('.noti-child-holder').append(val.HTML);

										setTimeout(function(){

											$('.noti-child-holder').find('.noti').addClass('open');

										},1000);

										

										

										$( "li[data-id='"+val.SENDER_ID+"']" ).

											find('.contact-msg-count').html(msgC);

										$( "li[data-id='"+val.SENDER_ID+"']" ).

											find('.contact-msg-count').removeClass('hide');

										$( "li[data-id='"+val.SENDER_ID+"']" ).

											find('.last-msg').html(val.MESSAGE);

											

										$( "li[data-id='"+val.SENDER_ID+"']" ).

											find('.time').html(val.TIME);

										

										

										if($( "#"+val.SENDER_ID).length!=0){

											if(val.SEND_BY_ME=="YES"){

												var sender_html='<div class="rec_row text-right clearfix" ';

												sender_html+='id="message-'+val.MESSAGE_ID+'">';

												sender_html+='<div class="text-bg append">'+val.MESSAGE+'</div>'

												sender_html+='</div>';

												

												$('#'+val.RECEIVER_ID).find('.conversation_holder').append(sender_html);

											

												

											}else{

											 var received_html='<div class="send_row text-left clearfix " ';

												 received_html+='id="message-'+val.MESSAGE_ID+'">';

												 received_html+='<span class="img-holder">';

												 received_html+='<img src="'+val.SENDER_PIC+'" alt=""></span>';

												 received_html+='<div class="text-bg append">';

												 received_html+=val.MESSAGE+'</div>';

												 received_html+='</div>';

												 $('#'+val.SENDER_ID).find('.conversation_holder').

												 append(received_html);

										

									  	}

									}

								 	/*

							var FirstDiv=$('.chat-usr-list').children().first('li').attr('data-id');*/

									$('.chat-usr-list').children().first('li').before( $( "li[data-id='"+val.SENDER_ID+"']" ) );

				

									 Notified.push(val.MESSAGE_ID);

									 MainCount++;

									 /*if(!$("#message-li").hasClass('active')){										

										 $("#message-count").html(MainCount);

										 $("#message-count").removeClass('hide');

									 }*/

									

								}								

							}

						}

					}

				});

			

			}

			jQuery.each( resp.notification, function( index, value ) {

				if(value.popup!=""){

					$('.pop-up-match').html(value.popup);

					$('.pop-up-match').show();	

					if(window.innerWidth < 768){

						$('body,html').addClass('hidden-scroll');	

					}else{

						$('body,html').removeClass('hidden-scroll');

						}

				}

				$('.noti-child-holder').append(value.html);

				setTimeout(function(){

					$('.noti-child-holder').find('.noti').addClass('open');

				},1000);

				$('.notification-holder').css('height',$('.noti-child-holder').outerHeight()+50);

			});

	});

}

setInterval(function() {

      continueAjax();

}, 5000);

setInterval(function() {

	if($('.noti-child-holder').find('.noti').length>2){

  		$('.noti-child-holder').find('.noti:first').remove();

	}

}, 7000);

$(document).ready(function(e) {

	

	if($('.chat-input-holeder').length>0){
		$('.AllEmoji').insertBefore('.chat-input-holeder');
	}
	$("#filter-contact").keyup(function(){
        var filter = $(this).val(), count = 0;
        var flag=false; 
	    $(".contact-list").each(function(){
            if ($(this).find('.item-name').text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
				flag=true;
            } else {
				flag=false;
                $(this).show();
                count++;
            }
        });
		
       
    });

	$(document).on('click','.noti_close',function(e){

		e.preventDefault();

		$(this).closest('.noti').remove();

	});

	var emoji="";

    $(document).on('click','.emoji-inner',function(e){

	  e.preventDefault();

	  	var activeId=$('.chat-usr-list').find('._ACTIVE_').attr('data-id');

		if($(this).closest('.Emoji_inner').length==0){

			return;

		}

		var emoji = '{'+$(this).attr('class').split(' ')[1]+'}';

		var MSG=$('#'+activeId).find('form').find('.chat-msg-input').val();

		$('#'+activeId).find('form').find('.chat-msg-input').val(MSG+emoji);	

		$('#'+activeId).find('form').find('#message_type').val("EMOJI");	

		$('#'+activeId).find('form').find('.chat-msg-input').focus();

		

  });

  $(document).on('click','._ACTIVE_ .chat-input-holeder input[type="submit"]',function(e) {

	  e.preventDefault();

	  e.stopPropagation();

	 var _time= makeDate();

	$('.AllEmoji').hide().removeClass('open');

	var activeId=$('.chat-usr-list').find('._ACTIVE_').attr('data-id');

	

	

	var str = "";

	if($('#'+activeId).find('form').find('.chat-msg-input').val() != "" && $('#'+activeId).find('form').find('.chat-msg-input').val().replace(/^\s+|\s+$/g, "").length != 0){

			var MSG=$('#'+activeId).find('form').find('.chat-msg-input').val();

			

			if (MSG.indexOf("<br>") <= 0){

					var entityMap = {

						  "&": "&",

						  "<": "'<'",

						  ">": "'>'",

						  '"': '"',

						  "'": "'",

						  "/": '/'

					};

					MSG=String(MSG).replace(/[&<>"'\/]/g, function (s) {

						return entityMap[s];

					});

			  }

			var str=MSG;

			var txt = MSG;		

			var newTxt = txt.split('{');

			for (var i = 1; i < newTxt.length; i++) {

				var code=newTxt[i].split('}')[0];				

		var replaceCode='<span class="emoji-outer emoji-sizer"><span class="emoji-inner '+code+'"></span></span>';

		 str = str.replace("{"+code+"}",replaceCode);

			}

		msg=str;

		msg=msg.replace(':)', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f60a"></span></span>'); 

		msg=msg.replace(':(', '<span class="emoji-outer emoji-sizer"> <span class="emoji-inner emoji2639"></span> </span>'); 

		msg=msg.replace(':-D', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f601"></span></span>'); 

		msg=msg.replace(':D', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f601"></span></span>'); 

		msg=msg.replace(':O', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f626"></span></span>'); 

		msg=msg.replace('8)', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f60e"></span></span>'); 

		msg=msg.replace('B-)', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f913"></span></span>'); 

		msg=msg.replace('B|', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f60e"></span></span>'); 

		msg=msg.replace('D:', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f627"></span></span>'); 

		msg=msg.replace(':*', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f48b"></span></span>'); 

		msg=msg.replace(';)', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f60f"></span></span>'); 

		msg=msg.replace(';-)', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f60f"></span></span>'); 

		msg=msg.replace(':|', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f610"></span></span>'); 

		msg=msg.replace(':P', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f60b"></span></span>'); 

		msg=msg.replace('>:(', '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f620"></span></span>'); 

		msg=msg.replace(":'(", '<span class="emoji-outer emoji-sizer"><span class="emoji-inner emoji1f625"></span></span>'); 

		

		

		$('#'+activeId).find('form').find('.chat-msg-input').val(msg);

			$('.get-started-block').addClass('hide');

			$('.conversation_holder').removeClass('hide');

			

			$('<div class="rec_row text-right clearfix" id="temp-message"><div class="text-bg">'+msg+'</div></div>').appendTo($('.myconversation._ACTIVE_').find('.conversation_holder'));	

			

			

			setTimeout(function(e){$('.conversation_holder .text-bg').addClass('append')},100);

			

			$('#'+activeId).find('form').find('.chat-msg-input').val("");

			makeScroll();

			if (~msg.indexOf('<span class="emoji-outer emoji-sizer">')){

				$('#'+activeId).find('form').find('#message_type').val("EMOJI");

			}

			$('.MSG').val(msg);

			var formData=$('#'+activeId).find('form').serialize();

			 $('.chat-usr-list').find('._ACTIVE_').find('.last-msg').html(msg);

			 $('.chat-usr-list').find('._ACTIVE_').find('.time').html(_time);

			call({url:"chat/sendMessage",params:formData,type:'POST',noloader:'yes'},function(resp){

					$('#temp-message').attr('id','message-'+resp.message_id);

					$('.chat-usr-list').children().first('li').before( $('.chat-usr-list').find('._ACTIVE_') );

					

			});

		}

		

    });		

	

    $(document).on('click','.contact-list',function(e) {

	

		//for messsage count//

		if(window.innerWidth < 768){

			$('body,html').addClass('hidden-scroll');	

		}else{

			$('body,html').removeClass('hidden-scroll');

			}

		$(this).find('.contact-msg-count').html('')

		$(this).find('.contact-msg-count').addClass('hide');

		$('.chat-right').show()

		//for li active class//

		

		$('.chat-usr-list li').removeClass('_ACTIVE_');

		var OTHER_USERID=$(this).attr('data-id');

		

		$(this).addClass('_ACTIVE_');

			

		//for conversation active class//	

		$('.chat-data').removeClass('_ACTIVE_')

		$('#'+OTHER_USERID).addClass('_ACTIVE_');

		var unreadMsg=0;		

		if($('#'+OTHER_USERID).length!=0){

			$('#'+OTHER_USERID).show();

			call({url:"chat/readMessage",params:{'OTHER_USERID':OTHER_USERID},type:'POST',noloader:'yes'}

			,function(resp){

				unreadMsg=resp.unreadmessage;				

				$('#message-count').text(parseInt($('#message-count').text())-unreadMsg);

				if(parseInt($('#message-count').text())==0){

					$('#message-count').addClass('hide');

				}

			});

			makeScroll();

			return false;

		}

		call({url:"chat/getConversation",params:{'OTHER_USERID':OTHER_USERID},type:'POST'},function(resp){

			if(resp.status==true){

				$('.chat-right').append(resp.html);

					unreadMsg=resp.unreadmessage;				

					$('#message-count').text(parseInt($('#message-count').text())-unreadMsg);

					if(parseInt($('#message-count').text())==0){

						$('#message-count').addClass('hide');

					}

					makeScroll();

				    $('.AllEmoji').insertBefore('.chat-input-holeder');

				

				

			}else{

				alert(resp.message)

			}

		});		

    });

	$(document).on('click','.back-ico',function(e){

		$('.chat-right').hide();

		$('body,html').removeClass('hidden-scroll');

		setTimeout(function(){$('html, body').animate({scrollTop:0},300);})

	});

	$('.back-ico').bind('touchstart click', function(){

		$('.chat-right').hide();

		$('body,html').removeClass('hidden-scroll');

		setTimeout(function(){$('html, body').animate({scrollTop:0},300);})

	  return false

	});

	$(document).on('click','.for-smily',function(e) {

		e.preventDefault();

		$('.AllEmoji').show().toggleClass('open');

	});

	$(document).on('click','.closeEmoji',function(e) {

		e.preventDefault();

		$('.AllEmoji').toggleClass('open');

		

	});

	

	setTimeout(function(){

		makeScroll();

	},1000);

	

	

});



