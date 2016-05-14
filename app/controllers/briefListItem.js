exports.baseController = "tikkGallery";
var item = [];

//Set view data
function setViewData(model) {
	this.item = model;

	if(this.item && this.item.get("brand_logo") && this.item.get("brand_logo").file ) {
		$.featuredUserThumb.applyProperties({
		    autoload: true,
		    image: this.item.get("brand_logo").file.fileUrl
		});		
	}
		
	$.tableViewRow.nodeId = this.item.id;
	
	$.nodeThumb.applyProperties({
	    autoload: true,
	    image: this.item.get("thumb")
	});
	
	$.followingNodeLabel.setText(this.item.get('titleUpperCase'));
	$.followingNodeUser.setText(this.item.get('followers'));
	
	$.featuerdNodeLabel.setText(this.item.get('titleUpperCase'));
}

setViewData(arguments[0].model);
