$(document).ready(function(){
	
	// Load typekit, then reveal content..
	try {
		Typekit.load({
		  active: function() {
				$(window).resize();
				$("#content").hide().removeClass('invisible').fadeIn(3000);
		  }
		});
	} catch(e) {
		$(window).resize();
		$("#content").hide().removeClass('invisible').fadeIn(3000);		
	}

});


$(window).resize(function() {
	
	$('#content').css({
		position:'absolute',
		top: ($(window).height() - $('#content').outerHeight())/2
	});
	
	$('body').css({
		width: $('#content').outerWidth(true) + 350
	});

});