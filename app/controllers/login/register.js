function drupalRegister() {
	var email = $.email.value;
	var emailValid = email != '' && validateEmail(email);
	var termsClicked = $.termsSwitch.value != 0;
	
	//Open register window
	if(emailValid && termsClicked) {
		Ti.App.fireEvent('showLoginLoading');
		//Register is only on lower case
		Alloy.Models.User.register(email.toLowerCase(), email.toLowerCase());	
	}
	else {
		var message = "Please make sure to "; 
		
		if(!emailValid) {
			message = message + "enter a valid email adress";
		}
		
		if(!termsClicked) {
			if(!emailValid) {
				message = message + " and ";
			}
			message = message + "accept Tikklr terms of use";
		}
		
		alert(message);
	}
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var text = "EMAIL";
 
var attributedText = Titanium.UI.iOS.createAttributedString({
	text: text,
	attributes: [
		{
            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
            value: Alloy.Globals.TikklrBlack,
            range: [0, text.length],
            type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
            value: Alloy.Globals.TikklrTextBlack,
            range: [0, text.length]
        }
    ]
});

function termsClicked() {
	Titanium.Platform.openURL('http://company.tikklr.com/terms');
}


$.email.attributedHintText = attributedText;
