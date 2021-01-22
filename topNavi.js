$(function(){
  
	var $html = $('html');
	var $header = $('header');
	var $logo = $('header .logo');
	var $gnb = $('#gnb')
	var $gnbA = $('#gnb > ul > li > a')
	var $gnbDepUl =  $('#gnb > ul > li > ul');
	var $topNavi1 =  $('#gnb > ul > li #topNavi1');
	var $gnbDep =  $('#gnb > ul > li > ul > li');
	var $gnbDepth =  $('#gnb > ul > li > ul > li > a');
	var $navi =  $('#navi');
	var $mNavi =  $('#mNavi');
	//var $topQuick =  $('#topQuick');

  
	
	// navi ani
  $gnbDepUl.each(function() {
	$(this).find('li').each(function( index ) {
	  //$(this).css({'animation-delay': (index/20)+'s'});
	  });
  });

  var menuEvent = function () {
	$topNavi1.each(function() {
	  if( $html.is('.web') ){
			$gnbA.each(function(){
				$(this).bind('mouseenter',function(){
					if (!$(this).is('#topNavi1')){
						$header.removeClass('on');
					} else {
						$header.addClass('on');
					}
				});
			});
			$header.bind('mouseleave',function(){
				$header.removeClass('on');
			});
			$gnbA.each(function(){
				$(this).bind('mouseleave',function(){
					
					if (!$(this).is('#topNavi1')){
						$header.removeClass('on');
					} else {
						$header.addClass('on');
					}
				});
			});
			$(this).removeClass('mIcon');
	  } else {
		$header.unbind('mouseenter mouseleave')          
		$(this).addClass('mIcon');
	  }
	});

	$gnbDepth.each(function() {
	  if( $html.is('.web') ){
		$(this).bind('mouseenter',function(){
		  $gnbA.removeClass('hover');
		  $(this).parent().parent().siblings('a').addClass('hover');
		});
		$(this).bind('mouseleave',function(){
		  $gnbA.removeClass('hover');
		});
	  } else {
		$(this).unbind('mouseenter mouseleave')
	  }
	});

	$gnbA.each(function() {
	  if( $html.is('.web') ){
		$(this).unbind('click');
	  } else {
		$(this).unbind('click');
		$(this).click(function(){
		  if ($(this).is('.hover')){
			$(this).siblings('ul').slideUp(300);
			$(this).removeClass('hover');
		  } else {
			$gnbDepUl.slideUp(300);
			$gnbA.removeClass('hover');
			$(this).addClass('hover');
			$(this).siblings('ul').slideDown(300);
		  }
		});
	  }
	});


  }

  

  var menuWchk = function(){
	var winWidth = $(window).width();
	if(winWidth > 768){ 
		$html.addClass('web');
		$html.removeClass('mobile'); 
		if ($('#mainWrap').length < 1){
			$header.addClass('subHd');
		}
	} else { 
		$html.removeClass('web'); 
		$html.addClass('mobile'); 
		$header.removeClass('subHd');
	}
  
	menuEvent();
  }

  var linkLimits = function (){ 
	$('a[id^=topNavi]').click(function(event){
	  var winWidth =  $(window).width();
	  if (winWidth < 768){ 
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
	  }
	});
  }; 


  $mNavi.bind('click',function(){
	var winHeight = $(window).height();	
	  if (!$(this).is('.active')){
	  $(this).addClass('active');
	  $navi.animate({'right':'0'},400);
	  //$navi.css('height',winHeight-$topQuick.height());
	  $('body').attr( 'data-pos', $(window).scrollTop() )
	  $('html, body').css({'overflow-y':'hidden','position':'relative','height':'100%'});
	  //$('#allBg').css({'display':'block'});
	} else {
	  $(this).removeClass('active');
	  $navi.animate({'right':'-100%'},400);
	  $('html, body').css({'overflow-y':'auto','position':'static','height':'auto'})
	  $(window).scrollTop( $('body').attr( 'data-pos' ) );
		//$('#allBg').css({'display':'none'});

	  $gnbA.removeClass('hover');
	  $gnbDepUl.removeAttr('style','');
	  $gnb.removeAttr('style','');
	  $navi.removeAttr('style','');
	}
  });

  
  var headerRe = function(){
	var winWidth = $(window).width();
	if (winWidth < 768){
	  $header.removeClass();
	  //if (!$('#subWrap').length > 0){ $header.addClass('subCont');}
	} else {

	}    
	
	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){ 
	  if ($mNavi.is('.active')){ $mNavi.click(); }
	}
  }

  var scrollDiv = function() {
		var $myTopH = $header.height()*0.1;
		var $tmp = $(window).scrollTop();
		if ($tmp <= $myTopH){ $header.removeClass('fixed'); $logo.css('display','block');
		} else { $header.addClass('fixed');}
  }

  var mScrollDiv = function() {
		var $myTopH = $header.height()*1.1;
		var $tmp = $(window).scrollTop();
		if ($tmp <= $myTopH){ $header.removeClass('fixed');$logo.css('display','block');//mfixed
		} else { $header.addClass('fixed');}//mfixed
  }

  
  $('html').bind('mousewheel', function(e){
	//if (!$html.is('.mobile')){  
	  if(e.originalEvent.wheelDelta < 0) { $header.removeClass('move');$logo.fadeOut();
	  } else { $header.addClass('move'); $logo.fadeIn();}
	//}
  });


  $(window).load(function() {
	menuWchk();
	linkLimits();
	if (!$html.is('.mobile')){
	  scrollDiv();      
	} else {
	  mScrollDiv();
	}

	$(window).scroll(function() { 
	  if (!$html.is('.mobile')){
		scrollDiv(); 
	  } else {
		mScrollDiv(); 
	  }
	});

  });
  //if (!$('#subWrap').length > 0){ $header.addClass('subCont');}

  $(window).resize(function() {
	menuWchk();
	linkLimits();
	headerRe();
  });

  $(window).on( "orientationchange", function( event ) { menuWchk(); linkLimits(); headerRe();} )



});