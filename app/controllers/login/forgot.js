function drupalForgot(){
	if($.email.value != '') {
		Ti.App.fireEvent('showLoginLoading');
		Alloy.Models.User.forgotPassword($.email.value.toLowerCase());
	}
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

$.email.attributedHintText = attributedText;
