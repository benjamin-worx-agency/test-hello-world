//App singeltons
Alloy.Models.User = Alloy.Models.instance('User');
Alloy.Models.Kaltura = Alloy.Models.instance('Kaltura');

//Init UA
// Alloy.Globals.UrbanAirship = require('ti.urbanairship');

var currentWin;
var currentPage;
var currentWinController;
var previousWin = [];

/**
 * Remove duplicate pages from the back queue
 */
function removeDuplicateViewsFromPrevious(page) {
	var viewToRemove = null; 
	for (var i in previousWin) { //Check if view is on the queue and remove it if so
		if(previousWin[i] == page) {
			viewToRemove = i;
		}
	}
	
	if  (viewToRemove != null) {
		var removedView = previousWin.splice(viewToRemove, 1); // Removes the item from the array
	}	
}

/**
 * Back event listener
 */
Ti.App.addEventListener('back', function(e) {

	var args = {}; //TODO: add support for back with args (keep args in an array as well)
	if(currentWin) { //If we have a current window
		$.mainView.remove(currentWin); //Remove view from the main view 
		cleanController(currentWinController); //Clean newly removed window.
		
		//Get new window from the back stack, remove all of the same windows (especially the current one)
		var win = previousWin.pop();
		winName = win.name;
		args = win.args;

        while (winName == currentPage) {
            win = previousWin.pop();
            winName = win.name;
            args = win.args;
        }
        
		if(winName) { //If there is an old window.
			if(previousWin.length == 0) { //We disable back button on last pages
				args['showBack'] = false;
			}
			
			if(typeof args['headerTitle'] != 'undefined') {
				args['headerTitle'] = "BRIEFS";	
			}
			
			
			var newWinController = Alloy.createController(winName, args); //Create it from its name
			var newWin = newWinController.getView(); //Get view
			$.mainView.add(newWin); //Add new view as main view
			
			currentWin = newWin; //Set current view as new view
			currentWinController = newWinController;
			currentPage = winName;
			
			previousWin.push(win);
		}
	}
});

function cleanController(controller) {

	if(typeof controller.clean != 'undefined') {
		controller.clean();	
	}
	
	controller.off();
	controller.destroy();
	controller = null;
}

/**
 * Attach window event listener
 */
Ti.App.addEventListener('attachWindow', function(e) {
	
	var args = {};
	var headerTitle = "BRIEFS";
	
	if(typeof e.arguments != 'undefined') { //Gets arguments from request
		args = e.arguments;
	}
	
	if(typeof e.headerTitle != 'undefined') { //Gets arguments from request
		var headerTitle = e.headerTitle;
		args['headerTitle'] = headerTitle;
	}
	
	if(previousWin.length == 0) { //We disable back button on last pages
		args['showBack'] = false;
	}
	
	var menuWinController = Alloy.createController(e.page, args); //Create new page
	var menuWin = menuWinController.getView(); //Get view
	
	//Check if page already exists and kill previous view.
	removeDuplicateViewsFromPrevious(e.page);
	
	if(currentWin) { //If we have a new window
		$.mainView.remove(currentWin); //Remove current win
				
		if(e.page != 'login') {
			var win = {};
			win.name = e.page;
			win.args = args;
		
			previousWin.push(win); //Don't add login as a back old page
		}
		
		cleanController(currentWinController); //Clean old view
	}
	
	$.mainView.add(menuWin); //Add new view
	currentWin = menuWin; //Set as the current view
	currentWinController = menuWinController;
	currentPage = e.page;
});

/**
 * Shows the error message
 */
function showError() {
	//Error is shown over success / loading
	hideLoading();
	hideSuccess();
	$.errorMessageHolder.show();
	$.errorMessageHolder.visible = true;
	$.errorLabel.show();
}

/**
 * Hides the error message
 */
function hideError() {
	$.errorMessageHolder.hide();
	$.errorMessageHolder.visible = false;
	$.errorLabel.hide();
}

/**
 * Shows success messages
 */
function showSuccess() {
	hideLoading();
	$.successMessageHolder.show();
	$.successMessageHolder.visible = true;
	$.successMessage.show();
}

/**
 * Hides the success message
 */
function hideSuccess() {
	$.successMessageHolder.hide();
	$.successMessageHolder.visible = false;
	$.successMessage.hide();
}

/**
 * Shows info messages
 */
function showInfo() {
  hideLoading();
  $.infoMessageHolder.show();
  $.infoMessageHolder.visible = true;
  $.infoMessage.show();
}

/**
 * Hides the info message
 */
function hideInfo() {
  $.infoMessageHolder.hide();
  $.infoMessageHolder.visible = false;
  $.infoMessage.hide();
}

/**
 * Add event listener to catch info messages
 */
Ti.App.addEventListener('triggerInfo', function(e) {
  $.infoMessage.text = e.message ? e.message : "hiya!!!";
  showInfo();
  setTimeout(function(){
    hideInfo();
  }, 1500);
});

/**
 * Add event listener to catch success messages
 */
Ti.App.addEventListener('triggerSuccess', function(e) {
	$.successMessage.message = e.message ? e.message : "SUCCESS!!!";
	showSuccess();
	setTimeout(function(){
		hideSuccess();
	}, 1500);
});

/**
 * Shows the loading indicator
 */
function hideLoading() {
	$.activityHolder.hide();
	$.activityIndicator.hide();
	$.activityHolder.top = null;
}

/* Push message handling */
Ti.App.addEventListener('resume', function() {
  if (Ti.App.pushMessage && Ti.App.pushMessage != '') {
    var Notificare = require('ti.notificare');
    Notificare.openNotification(Ti.App.pushMessage);
  }
  Ti.App.appIsPaused = false;
});

Ti.App.addEventListener('pause', function(){
  Ti.App.appIsPaused = true;
});

Ti.UI.iPhone.appBadge = null;

/**
 * Hides the loading indicator
 */
function showLoading(e) {
	$.activityHolder.top = e.top ? e.top: null;
	$.activityIndicator.message = e.message ? e.message : "Loading...";
	$.activityHolder.visible = true;
	$.activityHolder.show();
	$.activityIndicator.show();
	setTimeout(function(){
		Ti.App.fireEvent('stopLoading');
	}, 5000);
}

/**
 * Add event listener to catch Error messages
 */
Ti.App.addEventListener('triggerError', function(e) {
	// $.errorLabel.message = e.message ? e.message : "Oops...";
	// showError();
	// setTimeout(function(){
		// hideError();
	// }, 1500);
});

Ti.App.addEventListener('loading', function(e) {
	showLoading(e);
});

Ti.App.addEventListener('stopLoading', function() {
	hideLoading();	
});

/**
 * Back button clicked (on main page)
 */
backClicked = function(e) {
	Ti.App.fireEvent('back');
};

/**
 * Main window event click to close the action wheel
 */
function mainWindowClick() {
	Ti.API.info('mainWindowClicked');
	if($.actionMenuRequire.isOpen()) {
		$.actionMenuRequire.closeMenu();
	}
}

$.mainWindow.addEventListener('open', function(){
	Ti.App.fireEvent('attachWindow', { page: 'login' });
	Alloy.Models.User.isLoggedIn();
});

$.mainWindow.open();

exports.clean = function() {
	//Clean this controller in it's parent
	$.destroy();
	$.off();
};
