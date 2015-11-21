// Incredibly dirty hack to change the labels in the highcharts context menu
// from Download to Save.
// Simulate click on button to show context menues, then remove 
// clicked state styles with attr so they don't look clicked at start.
// String replace on innerHTML in context menus.
// Hide context menues so they don't show at start.
var buttons = document.querySelectorAll('.highcharts-button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick();
  $('rect', buttons[i]).attr('stroke', 'none').attr('fill', 'none');
}
var divs = document.querySelectorAll('.highcharts-contextmenu > div > div');
for (var i = 1; i < divs.length; i++) {
  divs[i].innerHTML = divs[i].innerHTML.replace('Download', 'Save');
}
$('.highcharts-contextmenu').hide();

// Remove header
$('.header').remove();
