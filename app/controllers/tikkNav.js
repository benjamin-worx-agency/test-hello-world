var scrollableViewObj;
var navigationBar;

var childViewsMapping = {};

$.setNavigationBar = function(nav, scrollableView) {
	nav.addEventListener('click', switchViews);
	scrollableView.addEventListener('scroll', onScroll);
	
	for (var i=0; i < nav.children.length; i++) {
		var buttonId = nav.children[i].id;
		childViewsMapping[buttonId] = i;
	};
	
	scrollableViewObj = scrollableView;
	navigationBar = nav;
	
	oldButton = nav.children[0];
	oldButton.backgroundColor = Alloy.Globals.TikklrGreen;
	oldButton.color = "white";
};

function selectButton(button) {
	oldButton.backgroundColor = "black";
	oldButton.color = Alloy.Globals.TikklrGreen;
	
	button.backgroundColor = Alloy.Globals.TikklrGreen;
	button.color = "white";
	
	if (button.id == 'hashBtn') {
		$.hashBtnIcon.backgroundImage = "search-eye-white.png";
	} else if (button.id == 'peopleBtn') {
		$.peopleBtnIcon.backgroundImage = "search-profile-white.png";
	} else if (button.id == 'briefBtn') {
		$.briefBtnIcon.backgroundImage = "search-brief-white.png";
	}
	
	//Change old button to green
	if (oldButton.id == 'hashBtn') {
		$.hashBtnIcon.backgroundImage = "search-eye.png";
	} else if (oldButton.id == 'peopleBtn') {
		$.peopleBtnIcon.backgroundImage = "search-profile.png";
	} else if (oldButton.id == 'briefBtn') {
		$.briefBtnIcon.backgroundImage = "search-brief.png";
	}
}

var oldButton;

switchViews = function(e) {
	if(e.source != oldButton) {
		var pageIndex = childViewsMapping[e.source.id];
		scrollableViewObj.setCurrentPage(pageIndex);
		Ti.App.fireEvent('galleryLoaded', {'id': scrollableViewObj.views[pageIndex].id});
		selectButton(e.source);
		oldButton = e.source;
		Ti.API.log('switchViews called');
	}
};

onScroll = function(e) {
	//Add animation for scroll
};

