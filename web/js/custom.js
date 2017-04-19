//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.classname').css({minHeight: 0});
  var ClassName = get_biggest($('.classname'));
  $('.classname').css({minHeight: ClassName});
}

function scrollToDivSec(element){
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop;
    var headerH = $('header').outerHeight(false);
    $('body, html').animate({
        scrollTop: totalScroll - headerH + 35
    }, 500);
}

function scrollToDiv(element){
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop;
    var headerH = $('header').outerHeight(false);
    $('body, html').animate({
        scrollTop: totalScroll - headerH + 1 
    }, 500);
}

function updateNav() {
    var wH = window.innerHeight ? window.innerHeight : $(window).height(),
        headerH = $('header').outerHeight(false),
        curPos = $(window).scrollTop() + headerH,
        currentHash,
        subMenu = $('.subnav-wrap'),
        liItems = subMenu.find('li');


    $('.jq-section').each(function(i, v){
        if($(this).offset().top <= curPos){
            currentHash = liItems.find('a[href="#'+$(this).attr('id')+'"]');

            liItems.children('a').parent('li').removeClass('active');
            currentHash.parent('li').addClass('active');
        }

    });
}

function initCustomForm() {
    $('select.custom-select').each(function() {
        $(this).wrap('<div class="custom-select-wrapper" />');
        $(this).before('<div class="custom-select-display" />');
        $(this).change(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).keyup(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).change();
    });
}

$(window).resize(function() {
	resize();

});

$(document).ready(function() {
	initCustomForm();

	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	if($(".fancybox").is(':visible')) {
		$(".fancybox").fancybox();	

		$(".fancybox").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			closeBtn		: false,
			helpers		: {
				title	: { type : 'inside' },
				buttons	: {}
			}
		});
	}
	
	$('header .subnav-wrap ul li > a:not(.free-consult-btn)').click(function(e){
        e.preventDefault();
        var __this = $(this),
        $targetDiv = $(__this.attr('href'));
        
        __this.parent().addClass('active');
        scrollToDiv($targetDiv,0);

    });

    $('.sec-pad .subnav-wrap ul li > a').click(function(e){
        e.preventDefault();
        var __this = $(this),
        $targetDiv = $(__this.attr('href'));
        
        __this.parent().addClass('active');
        scrollToDivSec($targetDiv,0);

    });

    $('.header-hamburger').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.main-menu').toggleClass('revealed');
	});	


	if($('.header-hamburger').is(':visible')) {
		$('nav > ul > li.has-sub > a').click(function(e){
			e.preventDefault();
			
			if($(this).hasClass('active')) {
				$(this).removeClass('active').next('ul').slideUp(300);

			} else {
				$('nav > ul > li.has-sub > a').removeClass('active');
				$('nav > ul > li.has-sub ul').slideUp(300);
				$(this).addClass('active').next('ul').slideDown(300);

			}
		});
	}

	// Open Consult form
	$('.free-consult, .free-consult-btn').click(function(e){
		e.preventDefault();
		$('.consult-form').addClass('is-open');
	});

	$('.search-icon').click(function(e){
		e.preventDefault();
		$('.search-form').addClass('is-open');
		setTimeout(function(){
			$('#search-field').focus();
		}, 400);
	});	

	$('.popup-close').click(function(e){
		e.preventDefault();
		$('.popup-wrap').removeClass('is-open');
	});
	// Close Consult form

	resize();
});

$(window).load(function() {
	resize();

	// preloader once done
	Pace.on('done', function() {
		// totally hide the preloader especially for IE
		setTimeout(function() {
			$('.pace-inactive').hide();
			$('.coverimage').addClass('animate');
			$('.home-banner-text, .free-consult, .cta-wrap').addClass('animate');

			if($(window).width() > 767 ) {
				$('.animated').appear(function() {
			        var element = $(this);
			        var animation = element.data('animation');
			        var animationDelay = element.data('delay');
			        if(animationDelay) {
			          setTimeout(function(){
			              element.addClass( animation + " visible" );
			              element.removeClass('hiding');
			          }, animationDelay);
			        } else {
			          element.addClass( animation + " visible" );
			          element.removeClass('hiding');
			        }               
			    }, {accY: -90});

		    } else {
		        $('.hiding').css({'opacity' : 1});
		    }
		}, 500);
	});
});



$(window).scroll(function() {
    updateNav();
   
});

$(window).on('scroll load', function(){

	if($('.subnav-wrap').is(':visible')) {
	    var _cur_top = $(window).scrollTop();
	    var breadOffset = $('.breadcrumbs').offset();
	    var totalBread = breadOffset.top - 110;

	    console.log(breadOffset.top);

	    if(  _cur_top >=  totalBread ) {
			$('header').addClass('is-fixed');
		} else {
			$('header').removeClass('is-fixed');
		}
	}

  //   if($('header').hasClass('adjusted')) {
  //   	if(  _cur_top >=  306 ) {
		// 	$('header').addClass('is-fixed');
		// } else {
		// 	$('header').removeClass('is-fixed');
		// }
  //   } else {
  //   	if(  _cur_top >=  40) {
		// 	$('header').addClass('is-fixed');

		// } else {
		// 	$('header').removeClass('is-fixed');
		// }
  //   }
	

});


