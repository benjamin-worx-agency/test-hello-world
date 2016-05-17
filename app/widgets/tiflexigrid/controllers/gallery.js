var args = arguments[0]||{};

var the_image = args.image || '';
var theWidth = args.width || '95%';
var thePadding = args.padding || 10;
var showTitle = args.showTitle || false;
var theTitle = args.title || '';

if(showTitle){
	$.fgThumb.width = theWidth - thePadding;
	$.fgThumb.height = theWidth * 0.70;
	$.fgThumb.top = thePadding / 2;
	
	$.fgImage.image = createThumb(the_image, theWidth - thePadding);
	$.fgImage.width = theWidth - thePadding;
	$.fgImage.height = theWidth * 0.70;
	
	var titleView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:'transparent'
	});
	
	var title = Ti.UI.createLabel({
		text:theTitle,
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		textAlign:'center',
		color:'#555',
	 	font:{fontSize:12}
	});
	titleView.add(title);
	$.fgMainView.add(titleView);
}
else{
	$.fgImage.image = createThumb(the_image, theWidth - thePadding);
	$.fgImage.width = theWidth - thePadding;
	$.fgImage.height = theWidth - thePadding;
	
	$.fgThumb.top = thePadding / 2;
	$.fgThumb.width = theWidth - thePadding;
	$.fgThumb.height = theWidth - thePadding;
}

function createThumb(image,size) {
	if (OS_IOS){ 
	  var imageView = Ti.UI.createImageView({
	    image: image,
	    width: size,
	    height: size,
	    hires:true
	  });
	  if(imageView && imageView.toImage()) {
	  	return imageView.toImage().imageAsResized(size,size);
	  } else {
	  	return imageView;
	  }
	} 
  	else{
  		return image;
  	}
}
