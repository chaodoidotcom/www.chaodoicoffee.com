
$(document).ready(function()
{
  	JS.onReady();
});
var JS={
			onReady: function() {
				JS.Banner();
				JS.Slide_Banners();
				$('#loading-page > div').fadeIn(500);
				//$('select').selecter({mobile:true});
				$(window).load(JS.Loading_page);
				// When Loaded
				$(window).load(function() {
					// width_client = $(document).width();
					$('input, textarea').placeholder();
					JS.Menu();
					JS.Go_top();
					JS.Load_Scroll_animation();
					JS.Contact_Tab();
					$('a, .has-ttrip').tooltip();
					JS.Popup();
					$(function(){$.scrollIt();});
				});
				// When Resize
				$(window).bind('resize', function() {
			  		// width_client = $(document).width();
				});

				// When Scroll
				$(window).scroll(function() {

				});
			},
			Popup:function() {
				$('.popup').fancybox({
					maxWidth	: 700
				});
			},
			Menu:function() {
				$('.main-menu ul > li').hover(function() {
					$(this).children('ul').toggleClass('active');
				});
				$('.box-lag').hover(function() {
					$('.sub-lag').toggleClass('animated fadeIn').toggle();
				});
				$('.open-menu, .wrapper-close').click(function() {
					$('nav').toggleClass('active');
					$('.wrapper-close').toggle();
				});
				$('.btn-cal').click(function() {
					$('#form-cal').slideToggle();
				});
			},
			Banner:function() {
				$('.box-banners').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					dots: true,
					infinite: true,
					speed: 1000,
					fade: true,
					slide: 'div',
					cssEase: 'linear',
					responsive: [
				    {
				      breakpoint: 768,
				      settings: {slidesToShow: 1}
				    },
				    {
				      breakpoint: 768,
				      settings: {slidesToShow: 1}
				    }]
				});
			},
			Slide_Banners:function() {
				/////////////////////////////////////// SLIDER 1 ITEMS  /////////////////////////////////////////
				
				var s1 = $('.slider-1-item');
				s1.owlCarousel({
				 	items:1,
				 	dots:true,
				 	loop:true,
				 	margin:0,
				 	responsiveRefreshRate:0,
				  autoplay:true,
    			autoplayTimeout:5000,
    			dragEndSpeed:300,
    			smartSpeed:500,
    			
				});
				/////////////////////////////////////// SLIDER 3 ITEMS  /////////////////////////////////////////
				var s3 = $('.slider-3-item');
				s3.owlCarousel({
				 	items:3,
				 	dots:true,
				 	loop:true,
				 	margin:20,
				 	responsiveRefreshRate:0,
				    // autoplay:true,
    				autoplayTimeout:5000,
    				dragEndSpeed:300,
    				smartSpeed:500,
    				responsive : {
					    0 : {
					       items:1,
					       margin:10
					    },
					    500 : {
					       items:2,
					       margin:20
					    },
					    768 : {
					       items:3,
					       margin:20
					    }
					}
				});
				$('.box-cslider #next').click(function() {
				    s3.trigger('next.owl.carousel');
				});
				$('.box-cslider #prev').click(function(){
					s3.trigger('prev.owl.carousel');
				});
				/////////////////////////////////////// SLIDER 4 ITEMS  /////////////////////////////////////////
				var s4 = $('.slider-4-item');
				s4.owlCarousel({
				 	items:4,
				 	dots:false,
				 	loop:true,
				 	margin:20,
				 	responsiveRefreshRate:0,
				    // autoplay:true,
    				autoplayTimeout:5000,
    				dragEndSpeed:300,
    				smartSpeed:500,
    				responsive : {
					    0 : {
					       items:1,
					       margin:10
					    },
					    500 : {
					       items:2,
					       margin:20
					    },
					    768 : {
					       items:4,
					       margin:20
					    }
					}
				});
				$('.box-cslider #next').click(function() {
				    s4.trigger('next.owl.carousel');
				});
				$('.box-cslider #prev').click(function(){
					s4.trigger('prev.owl.carousel');
				});

			},
			// ===================================================================
			// Loading Page Function
			// ===================================================================
			Loading_page:function() {
			  	$("#loading-page").fadeOut(300);
			},
			Load_Scroll_animation:function() {
				$('.logo').addClass('animation fadeInDown').attr('data-time','1s').attr('data-delay','1s');
				$('.s-about h1').addClass('animation fadeInUp').attr('data-time','1s').attr('data-delay','1s');
				$('.s-about p').addClass('animation fadeInUp').attr('data-time','1.5s').attr('data-delay','1s');
				$('.s-about .btn2').addClass('animation fadeInUp').attr('data-time','1s').attr('data-delay','1.5s');
				$('.box-title, .box-title-white, .title-center').addClass('animation fadeInUp').attr('data-time','1s').attr('data-delay','1s');
				$('.section-page .box-news-list .item').addClass('animation fadeInUp').attr('data-time','1.5s').attr('data-delay','1s');
				$('.section-page .box-news-list .item+.item').addClass('animation fadeInUp').attr('data-time','1s').attr('data-delay','1s');
				$('.section-page .box-news-list .item+.item+.item').addClass('animation fadeInUp').attr('data-time','1.5s').attr('data-delay','1s');
				$('.box-video').addClass('animation fadeIn').attr('data-time','2s').attr('data-delay','1s');
				$('.s-video .btn3').addClass('animation fadeIn').attr('data-time','2.5s').attr('data-delay','1s');
				$('.btn-product').addClass('animation fadeInDown').attr('data-time','1.5s').attr('data-delay','.5s');

				var width_client = $(document).width();
				var Window_Width = 990;
				if (width_client >= Window_Width) {
					new Animations().init();
				}
			},
			// ===================================================================
			// Back to top Function
			// ===================================================================
			Go_top:function() {
				$('.btn-go-top').click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, 800);
					return false;
				});
			},
			// =================================================================== 
			// Tab Function
			// ===================================================================
			Contact_Tab:function() {
				$('.contact-tab a').click(JS.TabAction);
			},
			TabAction:function(){
			    var tab_id = $(this).attr('data-tab');
			    $('.contact-tab a').removeClass('current');
			    $('.tab-content').removeClass('current');
			    $(this).addClass('current');
			    $("#"+tab_id).addClass('current');
			},
			// ===================================================================
			// Other Functions
			// ===================================================================
			Other:function() {
				// Your function
			}
		};