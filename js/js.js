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

		$('<img>').attr('src', $(this).attr('href')).on('load', () => /*function goes here*/).click(() => /*go away here*/).appendTo('#lightbox');
	});
});