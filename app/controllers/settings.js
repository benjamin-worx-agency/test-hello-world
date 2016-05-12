// $.enablePush.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.Notifications.EnablePush);
// $.pullMessages.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.Notifications.PullMessages);
// $.followers.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.Notifications.NewFanNotice);
// $.tikksNews.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.Notifications.News);
// $.studioMessages.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.Notifications.StudioMessages);
// $.consent.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.Consent);
// $.pullMessages2.value = Titanium.App.Properties.getString(Alloy.Globals.Properties.PullMessages);
// 
$.saveButton.setTouchEnabled(true);


function enablePushChanged(e){
	Titanium.App.Properties.setString(Alloy.Globals.Properties.Notifications.EnablePush, e.value);
}

function pullMessagesChanged(e){
	Titanium.App.Properties.setString(Alloy.Globals.Properties.Notifications.PullMessages, e.value);
}

function followersChanged(e){
	Titanium.App.Properties.setString(Alloy.Globals.Properties.Notifications.NewFanNotice, e.value);
}

function tikksNewsChanged(e){
	Titanium.App.Properties.setString(Alloy.Globals.Properties.Notifications.News, e.value);
}

function studioMessagesChanged(e){
	Titanium.App.Properties.setString(Alloy.Globals.Properties.Notifications.StudioMessages, e.value);
}

function consentChanged(e){
	Titanium.App.Properties.setString(Alloy.Globals.Properties.Consent, e.value);
}

function settingsBlur(e) {
	$.saveButton.setTouchEnabled(true);
	Alloy.Models.User.set(e.source.bind, e.value);
}

function settingsBlurDrupal(e) {
	$.saveButton.setTouchEnabled(true);
	Alloy.Models.User.setDrupalFieldValue(e.source.bind, e.value);
}

function logout(e) {
	Ti.App.fireEvent('attachWindow', {page: "login"});
	Ti.App.fireEvent('logout');
};

function deleteAccount(e) {
	//TODO: add are you sure you want to delete??
	// Alloy.Models.User.delete();
};

function saveUser(e) {
	
	Alloy.Models.User.set('group_access', null);
	
	Ti.App.fireEvent('loading', {"message": "Saving..."});
	var attributes = {};
	attributes["name"] = $.name.value;
	// attributes['name_first'] = Alloy.Models.User.setDrupalFieldValue('field_name_first_old', $.firstName.value);
	// attributes['name_last'] =  Alloy.Models.User.setDrupalFieldValue('field_name_last_old', $.lastName.value);
	 
	var updatedUser = Alloy.createModel("User", attributes);
	
	Ti.API.info("saving: " + JSON.stringify(updatedUser));
	Alloy.Models.User.save(attributes, { "success": function () {
		Ti.API.log("Saving user is a success");
			Alloy.Models.User.fetch({"success": function(){
				Ti.App.fireEvent('stopLoading');
			}}); //Get the new user data from the server
		},
	});
}

$.name.value = Alloy.Models.User.get('name');
$.mail.text = Alloy.Models.User.get('mail') ? "   " + Alloy.Models.User.get('mail') : "   " + Alloy.Models.User.get('name') ;
$.firstName.text =  "   " + Alloy.Models.User.getDrupalFieldValue('field_name_first');
$.lastName.text = "   " + Alloy.Models.User.getDrupalFieldValue('field_name_last');

if(typeof Alloy.Models.User.get('field_tikklr_location') != 'undefined' && typeof Alloy.Models.User.get('field_tikklr_location').und != 'undefined') {
	$.location.text = "   " + Alloy.Models.User.get('field_tikklr_location').und[0].country;
}
        	
exports.clean = function() {
	$.destroy();
	$.off();
};

/**
 * Handles the table click event - to close the action menu
 */
function tableClicked() {
	Ti.API.info('Settigns table clicked');
}

function gotoUrl(e){
	if (e.source.title == "EDIT PROFILE") {
		e.source.url = "http://www.tikklr.com/user/" + Alloy.Models.User.uid + "/edit-profile";
	}
	if(typeof e.source.url != 'undefined') {
		Ti.Platform.openURL(e.source.url);	
	}
}
