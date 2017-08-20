// Owl carousel wywołanie i zamknięcie  w zależności od szerokości okna przeglądarki funkcja initialize() //




// set the owl-carousel otions
var carousel_Settings = {
    
		loop:false,
		nav:false,
		items:1	
};

function initialize(){

  if ($(window).width() <= 1199) {
    // initialize owl-carousel if window screensize is less the 767px
    
      $('body').find('section.c-workflow ul.owl-carousel').owlCarousel( carousel_Settings );
    
      
    $('ul.c-workflow-gallery').height($('.c-workflow-gallery__item').outerHeight());
    $('ul.c-workflow-gallery .owl-stage-outer').height($('.c-workflow-gallery__item').outerHeight());
    $('ul.c-workflow-gallery .owl-stage-outer .owl-stage').height($('.c-workflow-gallery__item').outerHeight());          
    $('ul.c-workflow-gallery .owl-stage-outer .owl-stage .owl-item').height($('.c-workflow-gallery__item').outerHeight());      
  } else {
    // destroy owl-carousel and remove all depending classes if window screensize is bigger then 767px
    $('body').find('section.c-workflow ul.owl-carousel').trigger('destroy.owl.carousel');
  }
}

// initilize after window resize
var id;
$(window).on("resize", function() {
  clearTimeout(id);
  id = setTimeout(initialize, 500);
});

// initilize onload
initialize();        
    
    
    









    
    



/* Wywołanie nawigacji przyczepionej w odpowiedzi na scrollowanie w dół strony inicjowana na zdefiniowanym ScrollTop position */

$(window).scroll(function() {
  
		var ScrollPos = $(window).scrollTop();
    if (ScrollPos > 280) {
        $('.c-nav').addClass('fixed');
        
    } else {
        
        $('.c-nav').removeClass('fixed');      
    }
    
});       
    










    
   

// Zmiana nawigacji Mobile/Desktop w zależności od szerokości okna przeglądarki 

function displaymenu() {
    
    
var target = this.hash;
$target = $(target);    

  $(document).unbind("click.menuLinkEvent")
  if ($(window).width() <= 768) {

    $('.c-main-menu ul').css({
      display: 'none'
    });

      
    $(document).on("click.menuLinkEvent", "a.c-main-menu__link:not(a.c-main-menu__link[href='#main-header'])", function(event) {
      event.preventDefault();
      $('html,body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 56
      }, 800, function () {
          location.hash = target;
      $('.c-main-menu ul').slideToggle();
    });
    });        
    $(document).on("click.menuLinkEvent", "a.c-main-menu__link[href='#main-header']", function(event) {
        event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 800, function () {
                        location.hash = target;
      $('.c-main-menu ul').slideToggle();
    });
    });
    $('.c-nav .menu-trigger').click(function(ev) {
    	ev.stopImmediatePropagation()
      $('.c-nav .c-main-menu ul').slideToggle();
    });

  } else {

    $('.c-main-menu ul').css({
      display: 'block'
    });
    $(document).on("click.menuLinkEvent", "a.c-main-menu__link:not(a.c-main-menu__link[href='#main-header']):not(a.c-main-menu__link[href='#footer'])", function(event) {
      event.preventDefault();
      $('html,body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 90
      }, 800, function () {
          location.hash = target;
    });
    });        
    $(document).on("click.menuLinkEvent", "a.c-main-menu__link[href='#footer']", function(event) {
      event.preventDefault();
      $('html,body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 800, function () {
                        location.hash = target;
    });
    });
    $(document).on("click.menuLinkEvent", "a.c-main-menu__link[href='#main-header']", function(event) {
        event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 800);
    });      
  }
}


// displaymenu after window resize
var mega;
$(window).on("resize", function() {
  clearTimeout(mega);
  mega = setTimeout(displaymenu);
});

// displaymenu onload
displaymenu();














    
    
    
    
// karuzela odpowiedzialna za prezentację osób w sekcji team //

//slideshow style interval
var autoSwap = setInterval( swap,3500);

//pause slideshow and reinstantiate on mouseout
$('ul, span').hover(
  function () {
    clearInterval(autoSwap);
}, 
  function () {
   autoSwap = setInterval( swap,658000);
});

//global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.carousel .c-team-carousel__item').length;
var leftpos = itemCount;
var resetCount = itemCount;

//unused: gather text inside items class
$('.c-team-carousel__item').each(function(index) {
    items[index] = $(this).text();
});

//swap images function
function swap(action) {
  var direction = action;
  
  //moving carousel backwards
  if(direction == 'counter-clockwise') {
    var leftitem = $('.left-pos').attr('id') - 1;
    if(leftitem == 0) {
      leftitem = itemCount;
    }
    
    $('.right-pos').removeClass('right-pos').addClass('back-pos');
    $('.main-pos').removeClass('main-pos').addClass('right-pos');
    $('.left-pos').removeClass('left-pos').addClass('main-pos');
    $('#'+leftitem+'').removeClass('back-pos').addClass('left-pos');
    
    startItem--;
    if(startItem < 1) {
      startItem = itemCount;
    }
  }
  
  //moving carousel forward
  if(direction == 'clockwise' || direction == '' || direction == null ) {
    function pos(positionvalue) {
      if(positionvalue != 'leftposition') {
        //increment image list id
        position++;
        
        //if final result is greater than image count, reset position.
        if((startItem+position) > resetCount) {
          position = 1-startItem;
        }
      }
    
      //setting the left positioned item
      if(positionvalue == 'leftposition') {
        //left positioned image should always be one left than main positioned image.
        position = startItem - 1;
      
        //reset last image in list to left position if first image is in main position
        if(position < 1) {
          position = itemCount;
        }
      }
   
      return position;
    }  
  
   $('#'+ startItem +'').removeClass('main-pos').addClass('left-pos');
   $('#'+ (startItem+pos()) +'').removeClass('right-pos').addClass('main-pos');
   $('#'+ (startItem+pos()) +'').removeClass('back-pos').addClass('right-pos');
   $('#'+ pos('leftposition') +'').removeClass('left-pos').addClass('back-pos');

    startItem++;
    position=0;
    if(startItem > itemCount) {
      startItem = 1;
    }
  }
}

//next button click function
$('#next').click(function() {
  swap('clockwise');
});

//prev button click function
$('#prev').click(function() {
  swap('counter-clockwise');
});

//if any visible items are clicked
$('.c-team-carousel__item').click(function() {
  if($(this).attr('class') == 'items left-pos') {
     swap('counter-clockwise'); 
  }
  else {
    swap('clockwise'); 
  }
});
    
    

    
    








    
    
    
// Fukncja paginatcji prev/next odpowiedzialna za zmianę opinii klientów //    

 
$(function(){
	
	//k++  => k=k+1;
	
	/*
	for(k=0; k<100; k++){
		$('.for').append(" wykonanie numer: "+k+"<br>");
	}
	*/
	var ile = $("div.pagination").find('blockquote.c-testimonial').length;

	$("div.pagination blockquote.c-testimonial").hide();
	$("div.pagination blockquote.c-testimonial").first().show();
	

	
	$("ul.pagination li").first().addClass("j-active-tesimonials");

	

	
    
	$(document).on('click',"ul.pagination li", function(){
		var slide = parseInt( $(this).data('slide') );
			$("ul.pagination li").removeClass('j-active-tesimonials');
			$("ul.pagination li").eq(slide).addClass("j-active-tesimonials")
			$("div.pagination blockquote").hide().css({'opacity':0});
			$("div.pagination blockquote").eq(slide).show().css({'opacity':0}).animate({'opacity':1},1000);
				if(el>0){
						$(".prev").attr('href',"#"+(slide-1));
					}
					
				if(el<(ile-1) ){
						$(".next").attr('href',"#"+(slide+1));
					}
			
		});
})/* jq */


    
    

    
    
    
 





    
    



// funkcja scroll która przewija przeglądarkę do scrollTop: 0 po kliknięciu linku #top //
    
    
$(window).scroll($.debounce( 250, true, function(){
    $('#scrollMsg').html('SCROLLING!');
} ) );
$(window).scroll($.debounce( 250, function(){
    var scrollTOP = $(document).scrollTop();
var page = $("html, body");
    
	if (scrollTOP >= 200 ) {
          
          
          

          

    	$('.back-to-top').stop(page).animate ({
      
      	 "right" : "10px"
      
      }, 500, function() { { }
      	});   
      
    } 	else if (scrollTOP < 200)  {


        
    	$('.back-to-top').stop(page).animate({ "right" : "-50px"}, 500, function() { {  }
      	});   
        

    }
} ) );



$("a[href='#top']").click(function(e) {
    e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
    
    
    
    