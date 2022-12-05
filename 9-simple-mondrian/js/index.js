$(document).ready(function() {

	var color;
	
	$('.choice').click(function() {
		color = $(this).css('background-color');
	});
	
	$('.box').click(function() {
		$(this).css('background-color', color);
	});
});