

$(document).ready(function() {
	$('.loader1').hide();
	var _sFocus = false;

	function search_mobile(){

		$('.section-height').css('min-height',(window.innerHeight - ($('header').height() + $('footer').height())))

		if(window.innerWidth < 768){

			$('.search-bar-faq').insertBefore('.tab-menu.j-height');

		}else{

			$('.search-bar-faq').insertBefore('.tab-content-faq');

		}

	}

	search_mobile()

	$(window).resize(function(e) {

		if(!_sFocus) search_mobile()

    });

	

	$(document).on('focus','#search-string',function(e){

		_sFocus = true;

	});

	

	$(document).on('blur','#search-string',function(e){

		_sFocus = false;

	});

	

	$(window).on('load', function() {

        $('#myNavbar').removeClass('hidden-xs');

		//$('.section-height').addClass('585px');

		//$('.section-height').css('section-height',window.innerHeight-$('.section-height').offset().top-10)

		search_mobile()

    });

	

	var addData=function(){

		

		

			var pre=$('.swipe-sec-one.active').find('.draggable');

			var name=pre.attr('name');

			var miles="<i class='icon-location'></i> "+pre.attr('miles');

			var city=pre.attr('city');

			var int=pre.attr('int');

			var about=pre.attr('about');

			var Url=pre.attr('data-url');

			if(name=="?"){

					$('.swipe-pic-icon').hide();

					$('.otherprofile').hide(); 

				}

			$('.swipe-profile').find('.otherprofile').attr('href',Url);

			$('.swipe-profile').find('.name-age').html(name);

			$('.swipe-profile').find('.mile').html(miles);

			$('.swipe-profile').find('.city').html(city);

			$('.swipe-profile').find('.intrested').html(int);

			$('.swipe-profile').find('.aboutme').html(about);

	}

 

 $( ".makeFav" ).click(function(e) {

	 e.preventDefault();

	 var id=$(this).data('id');

    call({url:"user/makeFav",params:{'Id':id},

					type:'POST'},function(resp){

						

	});	

 });

  $( "#slider-range" ).slider({

      range: true,

      min: 18,

      max: 100,

      values: [ 18, 80 ],

      slide: function( event, ui ) {

        $( "#amount" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );

      },

	  stop: function(event, ui) {

                    var age =  ui.values[0]+','+ui.values[ 1 ];

                    call({url:"user/filterSetting",params:{'AGE':age},noloader:"yes",

						type:'POST'},function(resp){

					

					});	



      }

    });

    $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +

      " - " + $( "#slider-range" ).slider( "values", 1 ) );

	

	// $( "#slider-5" ).slider({

	// 	min: 0,

	// 	max: 900,

	//     values: [ 0, DISTANCE ],

	//     range: true,

	//     slide: function( event, ui ) {

	// 	  $( "#minval" ).val(ui.values[ 1 ]+' mi' );

	//    },

	// 	stop: function(event, ui) {

	// 			var dist =  ui.values[ 1 ];

	// 			call({url:"user/filterSetting",params:{'DISTANCE':dist},noloader:"yes",

	// 				type:'POST'},function(resp){

				

	// 			});	



	// 	}

	// });

	 //$( "#minval" ).val( $( "#slider-5" ).slider( "value"  ) );

	 $( "#minval" ).val($( "#slider-5" ).slider( "values", 1 )+' mi' );	

		

		

		

		$('.filter_gender').change(function() {

			if($(this).is(":checked")) {

				$(this).attr("checked", true);

				 call({url:"user/filterSetting",params:{'INTRESTED_IN':$(this).val()},noloader:"yes",

						type:'POST'},function(resp){

					

				});	

			}

			        

		});

		$('.filter_discover').change(function() {

			var v="";

			if($(this).is(":checked")) {

				var v="YES";

			}

			 call({url:"user/discover",params:{'DISCOVER':v},noloader:"yes",

						type:'POST'},function(resp){

					

			});	

			        

		});

	if($(".draggable").length > 0){

	 var $myDraggable=$(".draggable").draggable({

			drag: function( event, ui ) {	

					$('#myCarousel').find('ol').hide();;			

					if(ui.position.left > 0){

						$(this).css({

							'-webkit-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'-moz-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'-ms-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'-o-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'transform': 'rotate(' + ui.position.left/3+'deg' + ')'

						});

						

					}

					if(ui.position.left > 100){

						$(this).find('.dec-like-holder.declike').css({'opacity':0})

						$(this).find('.dec-like-holder.like').css({'opacity':1})

					}

					if(ui.position.left <= 100 && ui.position.left >= -100){

						$(this).find('.dec-like-holder').css({'opacity':0})

					}

					if(ui.position.left < 0){

						$(this).css({

							'-webkit-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'-moz-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'-ms-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'-o-transform': 'rotate(' + ui.position.left/3+'deg' + ')',

							'transform': 'rotate(' + ui.position.left/3+'deg' + ')'

						});

						

					}

					if(ui.position.left < -100){

						$(this).find('.dec-like-holder.like').css({'opacity':0})

						$(this).find('.dec-like-holder.declike').css({'opacity':1})

					}

					

					/*if(ui.position.left >= 100 || ui.position.left <= -100){

						$(this).find('.date-chr-holder').css({'opacity':0})

					}

					if(ui.position.left <= 100 && ui.position.left >=-100){

						$(this).find('.date-chr-holder').css({'opacity':1})

					}*/

					

				}	

		});

		$( ".draggable" ).on( "dragstop", function( event, ui ) {

			

			 var dragDiv=$('.swipe-sec-one.active').find('.draggable');

			 if(ui.position.left <100 && ui.position.left >+-100){

			

				   dragDiv.animate({

						"left": 0 ,

						 "top": 0

						 },

						 {

							 step: function(now) {

								if (now >= 0 && now <= 0) {

									dragDiv.css({'transform':'rotate(0deg)','transition':'all ease 0.5s'});

									$('#myCarousel').find('ol').show();;

								}

            			     } 

					     }

      			  );

			 }

			 if(ui.position.left >100){

				$('.dis').removeClass('dis');			 

			    dragAsLike(dragDiv)

			 }

			 if(ui.position.left < -100){

				$('.dis').removeClass('dis');	

			    dragAsUnLike(dragDiv)

			 }

			 

		});

		 function dragAsUnLike(dragDiv){

			 $('.dis').removeClass('dis');

			   dragDiv.find('.date-chr-holder').css({

					'-webkit-transform': 'scale(0.8)',

					'-moz-transform': 'scale(0.8)',

					'-ms-transform': 'scale(0.8)',

					'-o-transform': 'scale(0.8)',

					'transform': 'scale(0.8)',

					'pointer-events': 'none'

				});

				dragDiv.parent().animate({

				    '-webkit-transform': 'scale(1.5)',

					'-moz-transform': 'scale(1.5)',

					'-ms-transform': 'scale(1.5)',

					'-o-transform': 'scale(1.5)',

					'transform': 'scale(1.5)',

					'pointer-events': 'none',

					'opacity':0,

					'visibility':'hidden'

				});

				dragDiv.find('.dec-like-holder').css('opacity',0);

				//dragDiv.parent().hide();

				var pre=dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').find('.swipe-child');

				 if(dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').length==0){

					var city="?";

					var int="?";

					var about="?";

					var id="?";

					var name="?";

					var miles="?";;

					var Url="?";;
					var VDate="?";;
					var VStatus="?";;

				 }else{

					var city=pre.attr('city');

					var int=pre.attr('int');

					var about=pre.attr('about');

					var id=pre.attr('data-id');

					var name=pre.attr('name');

					var miles="<i class='icon-location'></i> "+pre.attr('miles');

					var Url=pre.attr('data-url');
					var VDate=pre.attr('data-verificationdate')
					var VStatus=pre.attr('data-verification')

				 }
				 var verificationHtml="";
				 if(VStatus=="PROCESS"){
					  var verificationHtml='<a href="#" data-id="" class="pledge">Pledge</a><span class="date-pledge">'+VDate+'</span>';
				 }
				  if(VStatus=="YES"){
					  var verificationHtml='<a href="#" class="verify-clean"><img src="../../../design/images/icons/right-check.png" alt="check">Verified Clean</a><span class="date-pledge">'+VDate+'</span>';
				 }
				 if(name=="?"){

					$('.swipe-pic-icon').hide();

					$('.otherprofile').hide(); 

					$('.navgtr').hide(); 

				 }

				 if(window.innerWidth<768){

					 $('.swipe-profile').find('.name-age').html('<span class="span-name">'+name+'</span>');

					 $('.swipe-profile').find('.mile').html('<span class="mobile-miles">'+pre.attr('miles')+' miles away</span>');

				 }else{

					$('.swipe-profile').find('.name-age').html(name);

					$('.swipe-profile').find('.mile').html(miles);

				 }


				$('.swipe-profile').find('.verification-holder').html(verificationHtml);
				$('.swipe-profile').find('.city').html(city);

				$('.swipe-profile').find('.intrested').html(int);

				$('.swipe-profile').find('.aboutme').html(about);

				$('.swipe-profile').find('.otherprofile').attr('data-id',id);

				$('.swipe-profile').find('.otherprofile').attr('href',Url);

					var ID=dragDiv.attr('data-id');

					dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').addClass('active');

					$('.active-back').removeClass('active-back');

					dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').next('.swipe-sec-one').addClass('active-back');

					dragDiv.parent('.swipe-sec-one').removeClass('active');					

				dragDiv.parent('.swipe-sec-one').find('#myCarousel').removeAttr('id');

					//dragDiv.parent('.swipe-sec-one').remove();

				call({url:"user/makeMatch",params:{'otherUserId':ID,'LikeOrUnlike':"UNLIKE"},noloader:"yes",

				type:'POST'},function(resp){

					

				});

			 

		 }

	     function dragAsLike(dragDiv){

			 $('.dis').removeClass('dis');	

				dragDiv.find('.date-chr-holder').css({

					'-webkit-transform': 'scale(1.5)',

					'-moz-transform': 'scale(1.5)',

					'-ms-transform': 'scale(1.5)',

					'-o-transform': 'scale(1.5)',

					'transform': 'scale(1.5)',

					'pointer-events': 'none'

				});

				dragDiv.parent().animate({

				    '-webkit-transform': 'scale(1.5)',

					'-moz-transform': 'scale(1.5)',

					'-ms-transform': 'scale(1.5)',

					'-o-transform': 'scale(1.5)',

					'transform': 'scale(1.5)',

					'pointer-events': 'none',

					'opacity':0,

					'visibility':'hidden'

				});

				dragDiv.find('.dec-like-holder').css('opacity',0);

				var pre=dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').find('.swipe-child');

				

				if(dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').length==0){

					var city="?";

					var int="?";

					var about="?";

					var id="?";

					var name="?";

					var miles="?";;

					var Url="?";;
					var VDate="?"
					var VStatus="?";

				 }else{

					var city=pre.attr('city');

					var int=pre.attr('int');

					var about=pre.attr('about');

					var id=pre.attr('data-id');

					var name=pre.attr('name');

					var miles="<i class='icon-location'></i> "+pre.attr('miles');

					var Url=pre.attr('data-url');
					var VDate=pre.attr('data-verificationdate')
					var VStatus=pre.attr('data-verification')

				 }

				 if(name=="?"){

					$('.swipe-pic-icon').hide();

					$('.otherprofile').hide(); 

					$('.navgtr').hide(); 

				 }
			      var verificationHtml="";
				 if(VStatus=="PROCESS"){
					  var verificationHtml='<a href="#" data-id="" class="pledge">Pledge</a><span class="date-pledge">'+VDate+'</span>';
				 }
				  if(VStatus=="YES"){
					  var verificationHtml='<a href="#" class="verify-clean"><img src="../../../design/images/icons/right-check.png" alt="check">Verified Clean</a><span class="date-pledge">'+VDate+'</span>';
				 }
				 if(window.innerWidth<768){

					 $('.swipe-profile').find('.name-age').html('<span class="span-name">'+name+'</span>');

					 $('.swipe-profile').find('.mile').html('<span class="mobile-miles">'+pre.attr('miles')+' miles away</span>');

				 }else{

					$('.swipe-profile').find('.name-age').html(name);

					$('.swipe-profile').find('.mile').html(miles);

				 }				
				$('.swipe-profile').find('.verification-holder').html(verificationHtml);
				$('.swipe-profile').find('.city').html(city);

				$('.swipe-profile').find('.intrested').html(int);

				$('.swipe-profile').find('.aboutme').html(about);

				$('.swipe-profile').find('.otherprofile').attr('data-id',id);

				$('.swipe-profile').find('.otherprofile').attr('href',Url);

				$('.active-back').removeClass('active-back');

				dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').next('.swipe-sec-one').addClass('active-back');

				dragDiv.parent('.swipe-sec-one').next('.swipe-sec-one').addClass('active');

				dragDiv.parent('.swipe-sec-one').removeClass('active');

				dragDiv.parent('.swipe-sec-one').find('#myCarousel').removeAttr('id');

			//	dragDiv.parent('.swipe-sec-one').remove();

				var ID=dragDiv.attr('data-id');

				call({url:"user/makeMatch",params:{'otherUserId':ID,'LikeOrUnlike':"LIKE"},noloader:"yes",

				type:'POST'},function(resp){

				});			 

		}

		$(document).on('click','#like',function(e) {

			var dragDiv=$('.swipe-sec-one.active').find('.draggable');
			dragDiv.find('.dec-like-holder.declike').css({'opacity':0})
     	    dragDiv.find('.dec-like-holder.like').css({'opacity':1});
			setTimeout(function(){
			dragDiv.find('.date-chr-holder').css({

					'-webkit-transform': 'scale(1.5)',

					'-moz-transform': 'scale(1.5)',

					'-ms-transform': 'scale(1.5)',

					'-o-transform': 'scale(1.5)',

					'transform': 'scale(1.5)',

					'pointer-events': 'none'

				});

			dragAsLike(dragDiv);
			},250);

       });

		  $(document).on('click','#unlike',function(e) {

			  var dragDiv=$('.swipe-sec-one.active').find('.draggable');
			  dragDiv.find('.dec-like-holder.declike').css({'opacity':1})
     	      dragDiv.find('.dec-like-holder.like').css({'opacity':0});
			 setTimeout(function(){
			  dragDiv.find('.date-chr-holder').css({

					'-webkit-transform': 'scale(0.8)',

					'-moz-transform': 'scale(0.8)',

					'-ms-transform': 'scale(0.8)',

					'-o-transform': 'scale(0.8)',

					'transform': 'scale(0.8)',

					'pointer-events': 'none'

				});

			  dragAsUnLike(dragDiv);
			 },250);

		  });

		

		

	}

	

	if($('.nav-faq,.collapse').length > 0){

		$('.nav-faq,.collapse').tabCollapse();

	}

	var Height = $('.outer-height').outerHeight()-14

	$('.j-height').css('height', Height);

	$('.status_close').click(function(e) {

        $('.header-top').slideUp(300);

    });

	$('.file-upload').change(function(e) {

        $('.upload-sec').css('background-image','url('+$('.file-upload').val()+')')

    });

	

	$('.setting-check input[type="checkbox"]').change(function(e) {

		var id=$(this).attr('data-id');

		

		if($(this).is(':checked')){

			$(this).closest('.setting-check').addClass('active')

			$('#'+id).val('YES');

		}else{

			$(this).closest('.setting-check').removeClass('active');

			$('#'+id).val('NO');

					

		}

    });

	

	

	

	$(document).on('click','#back',function(e){

		

		$('#myCarousel').removeAttr('#myCarousel');

	    var th=$('.swipe-sec-one.active');

		th.prev('.swipe-sec-one').addClass('active');

		if(window.innerWidth < 768){

			th.prev('.swipe-sec-one').find('.name-age').html('<span class="span-name">'+th.prev('.swipe-sec-one').find('.draggable').attr('name')+'</span>');

			th.prev('.swipe-sec-one').find('.mile').html('<i class="icon-location"></i><span class="mobile-miles">'+th.prev('.swipe-sec-one').find('.draggable').attr('miles')+'</span>');

		}else{

			var NAME = th.prev('.swipe-sec-one').find('.draggable').attr('name');

			var MILES = th.prev('.swipe-sec-one').find('.draggable').attr('miles');

			$('.profile-det').find('.name-age').text(NAME);

			$('.profile-det').find('.mile').text(MILES);

		}

		th.prev('.swipe-sec-one').css('opacity',1);

		th.prev('.swipe-sec-one').find('.carousel').attr('id','myCarousel');

		if(th.prev('.swipe-sec-one').is(':first-child')){

			$('#back').addClass('dis');

		}

		$('#myCarousel').find('ol').show();

		th.prev('.swipe-sec-one').children().removeAttr('style');

		th.prev('.swipe-sec-one').children().attr('style','position:relative')

		th.prev('.swipe-sec-one').children().find('.date-chr-holder').removeAttr('style');

		th.removeClass('active');

		var Eback=$('.active-back').prev();

		$('.active-back').removeClass('active-back');

		Eback.addClass('active-back');

	});

	$(window).resize(function(e) {

        //$('.chat-data').css('height',$('#messages').innerHeight());

    });

	/*if($(".mCustomScrollbar").length > 0){

		$(".mCustomScrollbar").mCustomScrollbar();

	}*/



	if($("#mCustomScrollbar1").length > 0){

		$("#mCustomScrollbar1").mCustomScrollbar();

	}

	$('.icon-speech-bubble').click(function(e) {

        $('.new_message').slideToggle(300);	

		$('.chat-data > .view-pro-row,.get-started-block').addClass('hide');

		$('.compose_main').removeClass('hide');

    });

	

	

	$(window).on('load', function() {

		//$('.loader1').fadeOut(500);
		$(".lazy").lazyload();		

		if($(".mCustomScrollbar").length > 0){

        	$(".mCustomScrollbar").mCustomScrollbar({

				scrollButtons:{enable:true},

				theme:"light-thick",

				scrollbarPosition:"outside"

			});

			

		}

		//

	});

	$(document).on('click','.try-agin',function(e) {

		e.preventDefault();

		$('.very-status').addClass('hide');

		$('.trytoupload').removeClass('hide');

	});

	$('.swip-wrap-parent,.not-available').css({'width':$('span.date-chr-holder img').outerWidth(),'height':$('span.date-chr-holder img').outerWidth()})

	$('.not-available').css('line-height',$('span.date-chr-holder img').outerWidth()+'px')

	

	$(window).on('load',function(){

		$('.swip-wrap-parent,.not-available').css({'width':$('span.date-chr-holder img').outerWidth(),'height':$('span.date-chr-holder img').outerWidth()})

		$('.not-available').css('line-height',$('span.date-chr-holder img').outerWidth()+'px')	

	})

	

	

});

/*! Lazy Load XT v1.1.0 2016-01-12

 * http://ressio.github.io/lazy-load-xt

 * (C) 2016 RESS.io

 * Licensed under MIT */



(function ($, window, document, undefined) {

    // options

    var lazyLoadXT = 'lazyLoadXT',

        dataLazied = 'lazied',

        load_error = 'load error',

        classLazyHidden = 'lazy-hidden',

        docElement = document.documentElement || document.body,

    //  force load all images in Opera Mini and some mobile browsers without scroll event or getBoundingClientRect()

        forceLoad = (window.onscroll === undefined || !!window.operamini || !docElement.getBoundingClientRect),

        options = {

            autoInit: true, // auto initialize in $.ready

            selector: 'img[data-src]', // selector for lazyloading elements

            blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',

            throttle: 99, // interval (ms) for changes check

            forceLoad: forceLoad, // force auto load all images



            loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile

            updateEvent: 'load orientationchange resize scroll touchmove focus', // page-modified events

            forceEvent: 'lazyloadall', // force loading of all elements



            //onstart: null,

            oninit: {removeClass: 'lazy'}, // init handler

            onshow: {addClass: classLazyHidden}, // start loading handler

            onload: {removeClass: classLazyHidden, addClass: 'lazy-loaded'}, // load success handler

            onerror: {removeClass: classLazyHidden}, // error handler

            //oncomplete: null, // complete handler



            //scrollContainer: undefined,

            checkDuplicates: true

        },

        elementOptions = {

            srcAttr: 'data-src',

            edgeX: 0,

            edgeY: 0,

            visibleOnly: true

        },

        $window = $(window),

        $isFunction = $.isFunction,

        $extend = $.extend,

        $data = $.data || function (el, name) {

            return $(el).data(name);

        },

        elements = [],

        topLazy = 0,

    /*

     waitingMode=0 : no setTimeout

     waitingMode=1 : setTimeout, no deferred events

     waitingMode=2 : setTimeout, deferred events

     */

        waitingMode = 0;



    $[lazyLoadXT] = $extend(options, elementOptions, $[lazyLoadXT]);



    /**

     * Return options.prop if obj.prop is undefined, otherwise return obj.prop

     * @param {*} obj

     * @param {*} prop

     * @returns *

     */

    function getOrDef(obj, prop) {

        return obj[prop] === undefined ? options[prop] : obj[prop];

    }



    /**

     * @returns {number}

     */

    function scrollTop() {

        var scroll = window.pageYOffset;

        return (scroll === undefined) ? docElement.scrollTop : scroll;

    }



    /**

     * Add new elements to lazy-load list:

     * $(elements).lazyLoadXT() or $(window).lazyLoadXT()

     *

     * @param {object} [overrides] override global options

     */

    $.fn[lazyLoadXT] = function (overrides) {

        overrides = overrides || {};



        var blankImage = getOrDef(overrides, 'blankImage'),

            checkDuplicates = getOrDef(overrides, 'checkDuplicates'),

            scrollContainer = getOrDef(overrides, 'scrollContainer'),

            forceShow = getOrDef(overrides, 'show'),

            elementOptionsOverrides = {},

            prop;



        // empty overrides.scrollContainer is supported by both jQuery and Zepto

        $(scrollContainer).on('scroll', queueCheckLazyElements);



        for (prop in elementOptions) {

            elementOptionsOverrides[prop] = getOrDef(overrides, prop);

        }



        return this.each(function (index, el) {

            if (el === window) {

                $(options.selector).lazyLoadXT(overrides);

            } else {

                var duplicate = checkDuplicates && $data(el, dataLazied),

                    $el = $(el).data(dataLazied, forceShow ? -1 : 1);



                // prevent duplicates

                if (duplicate) {

                    queueCheckLazyElements();

                    return;

                }



                if (blankImage && el.tagName === 'IMG' && !el.src) {

                    el.src = blankImage;

                }



                // clone elementOptionsOverrides object

                $el[lazyLoadXT] = $extend({}, elementOptionsOverrides);



                triggerEvent('init', $el);



                elements.push($el);

                queueCheckLazyElements();

            }

        });

    };





    /**

     * Process function/object event handler

     * @param {string} event suffix

     * @param {jQuery} $el

     */

    function triggerEvent(event, $el) {

        var handler = options['on' + event];

        if (handler) {

            if ($isFunction(handler)) {

                handler.call($el[0]);

            } else {

                if (handler.addClass) {

                    $el.addClass(handler.addClass);

                }

                if (handler.removeClass) {

                    $el.removeClass(handler.removeClass);

                }

            }

        }



        $el.trigger('lazy' + event, [$el]);



        // queue next check as images may be resized after loading of actual file

        queueCheckLazyElements();

    }





    /**

     * Trigger onload/onerror handler

     * @param {Event} e

     */

    function triggerLoadOrError(e) {

        triggerEvent(e.type, $(this).off(load_error, triggerLoadOrError));

    }





    /**

     * Load visible elements

     * @param {bool} [force] loading of all elements

     */

    function checkLazyElements(force) {

        if (!elements.length) {

            return;

        }



        force = force || options.forceLoad;



        topLazy = Infinity;



        var viewportTop = scrollTop(),

            viewportHeight = window.innerHeight || docElement.clientHeight,

            viewportWidth = window.innerWidth || docElement.clientWidth,

            i,

            length;



        for (i = 0, length = elements.length; i < length; i++) {

            var $el = elements[i],

                el = $el[0],

                objData = $el[lazyLoadXT],

                removeNode = false,

                visible = force || $data(el, dataLazied) < 0,

                topEdge;



            // remove items that are not in DOM

            if (!$.contains(docElement, el)) {

                removeNode = true;

            } else if (force || !objData.visibleOnly || el.offsetWidth || el.offsetHeight) {



                if (!visible) {

                    var elPos = el.getBoundingClientRect(),

                        edgeX = objData.edgeX,

                        edgeY = objData.edgeY;



                    topEdge = (elPos.top + viewportTop - edgeY) - viewportHeight;



                    visible = (topEdge <= viewportTop && elPos.bottom > -edgeY &&

                        elPos.left <= viewportWidth + edgeX && elPos.right > -edgeX);

                }



                if (visible) {

                    $el.on(load_error, triggerLoadOrError);



                    triggerEvent('show', $el);



                    var srcAttr = objData.srcAttr,

                        src = $isFunction(srcAttr) ? srcAttr($el) : el.getAttribute(srcAttr);



                    if (src) {

                        el.src = src;

                    }



                    removeNode = true;

                } else {

                    if (topEdge < topLazy) {

                        topLazy = topEdge;

                    }

                }

            }



            if (removeNode) {

                $data(el, dataLazied, 0);

                elements.splice(i--, 1);

                length--;

            }

        }



        if (!length) {

            triggerEvent('complete', $(docElement));

        }

    }





    /**

     * Run check of lazy elements after timeout

     */

    function timeoutLazyElements() {

        if (waitingMode > 1) {

            waitingMode = 1;

            checkLazyElements();

            setTimeout(timeoutLazyElements, options.throttle);

        } else {

            waitingMode = 0;

        }

    }





    /**

     * Queue check of lazy elements because of event e

     * @param {Event} [e]

     */

    function queueCheckLazyElements(e) {

        if (!elements.length) {

            return;

        }



        // fast check for scroll event without new visible elements

        if (e && e.type === 'scroll' && e.currentTarget === window) {

            if (topLazy >= scrollTop()) {

                return;

            }

        }



        if (!waitingMode) {

            setTimeout(timeoutLazyElements, 0);

        }

        waitingMode = 2;

    }





    /**

     * Initialize list of hidden elements

     */

    function initLazyElements() {

        $window.lazyLoadXT();

    }





    /**

     * Loading of all elements

     */

    function forceLoadAll() {

        checkLazyElements(true);

    }





    /**

     * Initialization

     */

    $(document).ready(function () {

		

        triggerEvent('start', $window);



        $window

            .on(options.updateEvent, queueCheckLazyElements)

            .on(options.forceEvent, forceLoadAll);



        $(document).on(options.updateEvent, queueCheckLazyElements);



        if (options.autoInit) {

            $window.on(options.loadEvent, initLazyElements);

            initLazyElements(); // standard initialization

        }

    });

$(window).resize(function(e) {
    $('.swip-wrap-parent,.not-available').css({'width':$('span.date-chr-holder img').outerWidth(),'height':$('span.date-chr-holder img').outerWidth()})

	$('.not-available').css('line-height',$('span.date-chr-holder img').outerWidth())
});

})(window.jQuery || window.Zepto || window.$, window, document);

window.onresize = function(){

	console.log($('span.date-chr-holder img').outerWidth())

	$('.swip-wrap-parent,.not-available').css({'width':$('span.date-chr-holder img').outerWidth(),'height':$('span.date-chr-holder img').outerWidth()})

	$('.not-available').css('line-height',$('span.date-chr-holder img').outerWidth())

	

};