
var args = arguments[0] || null;

if(args && args['error']) {
	$.errorText.setText(args['error']);	
}
