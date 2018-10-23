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

	//Slideshow
	$('#innerContainer').click(function(){
		var scroolAmount = $(this).width() - 15 - $(this).parent().width();
		console.log(`scroolAmount = ${scroolAmount}`);
		var currentPos = Math.abs(parseInt($(this).css('left')));
		console.log(`currentPos = ${currentPos}`);
		var nextScrool = ~~($(this).parent().width());
		console.log(`nexrScrool = ${nextScrool}`);
		var remainingScrool = scroolAmount - currentPos;
		console.log(`remainingScrool = ${remainingScrool}`);

		currentPos < scroolAmount ? $(this).animate({'left': '-=' + nextScrool}, 'slow') : $(this).animate({'left': '0'}, 'fast');
	})

	//Crossfade
	$('#crossfade').hover(function(){
		var pos = $(this).offset();
		console.log(pos.top);
		$(this).find('img:eq(1)').stop(true, true).fadeIn().css({});
	}, function(){
		$(this).find('img:eq(1)').fadeOut();
	})

	//Crossfade Slideshow
	const slideFade = () => {
		var current =  $('#fadeSlide .show');
		var next = current.next().length ? current.next() : current.siblings().first();

		current.hide().removeClass('show');
		next.fadeIn().addClass('show');

		setTimeout(slideFade, 2000);
	};

	slideFade();

	const flipPics = (currentImg) => {
		var numImg = $('#zIndex img').length;
		var currentImg = currentImg % numImg;
		$('#zIndex img').eq(currentImg).fadeOut(function(){
			$('#zIndex img').each(function(i){
				$(this).css({
					'zIndex': ((numImg - i) + currentImg) % numImg
				});
			});
			$(this).show();
			setTimeout(function(){
				flipPics(++currentImg);
			}, 2000);
		});
	}

	flipPics(0);
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
			'overflow-y': 'auto', 
		});
	});

}