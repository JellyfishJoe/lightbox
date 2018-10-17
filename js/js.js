$(document).ready(() => {

	$('.thumb').click(function(event){
		event.preventDefault();
		$('body').css('overflow-y', 'hidden');
	
		$('<div id="overlay"></div>').css({
			'opacity': '0',
			'position': 'fixed',
			'top': '0',
		})
		.animate({
			'opacity': '0.5',
		}, 'slow')
		.appendTo('body');

		$('<div id="lightbox"></div>').hide().appendTo('body');

		$('<img>').attr('src', $(this).attr('href')).on('load', () => placeImg()).click(() => remove()).appendTo('#lightbox');

		$('#overlay').click(() => remove());
	});
});

const placeImg = () => {
	console.log('ran');
	var top = ($(window).height() - $('#lightbox').height()) / 2;
	var left = ($(window).width() - $('#lightbox').width()) / 2;
	console.log(top, left);
	$('#lightbox').css({
		'top':top,
		'left':left
	}).fadeIn('slow');
};

const remove = () => {
	$('#overlay, #lightbox').fadeOut('slow', function(){
		$(this).remove();
		$('body').css({
			'overflow-y': 'auto' 
		});
	});

}