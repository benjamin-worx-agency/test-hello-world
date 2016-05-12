// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// = function(){};

Titanium.App.idleTimerDisabled = true;

// Alloy.Globals.fb = require('facebook');
// Alloy.Globals.fb.appid = '172196406295610';
// Alloy.Globals.fb.permissions = ['basic_info', 'email'];
// 

// Iphone globals
Alloy.Globals.VideoTimeLimit = 30000;
Alloy.Globals.VideoQuality = Titanium.Media.QUALITY_MEDIUM;
Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7);
Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 568); 
Alloy.Globals.isIpad = (OS_IOS && (Ti.Platform.osname == "ipad" || Ti.Platform.osname == "iPad" || Ti.Platform.osname == "iPad 2"));

// Kaltura Globals
Alloy.Globals.ks = "";
Alloy.Globals.partnerId = 102;
Alloy.Globals.adminSecret = 'b01370367cb8c6b2722ca7404eb91671';
Alloy.Globals.secret = "fbbfef797ca9dbfebb2acd661adce4dd";
//AWS Kaltura DNS name
// Alloy.Models.KalturaAPIUrl = "http://ec2-54-229-24-57.eu-west-1.compute.amazonaws.com/api_v3/index.php";
// Alloy.Models.KalturaBaseUrl = "http://ec2-54-229-24-57.eu-west-1.compute.amazonaws.com";
 
Alloy.Models.KalturaBaseUrl = "http://video.tikklr.com/";
Alloy.Models.KalturaAPIUrl = Alloy.Models.KalturaBaseUrl + "api_v3/index.php";

Alloy.Globals.drupalBaseUrl = "http://www.tikklr.com/";
// Alloy.Globals.drupalBaseUrl = "http://ec2-54-229-56-129.eu-west-1.compute.amazonaws.com/";

//Tikklr Drupal AWS public DNS
Alloy.Globals.drupalApiUrl = Alloy.Globals.drupalBaseUrl + "api/";
Alloy.Globals.drupalPublicImageUrlBase = 'http://www.tikklr.com/sites/default/files/styles/254x175/public/pictures/';
Alloy.Globals.FeaturedCategoryId = 448;

// UI globals for TSS and app
Alloy.Globals.animationDuration = 200;
Alloy.Globals.topZindex = 2000;
Alloy.Globals.menuWidth = 200;
Alloy.Globals.menuImageHeight = 250;
Alloy.Globals.barHeight = 4;
Alloy.Globals.buttonBarHeight = "42";
Alloy.Globals.ToolbarHeight = 40;
Alloy.Globals.PaddingLeft = 25;
Alloy.Globals.PaddingTop = 5;
Alloy.Globals.PaddingRight = 25;
Alloy.Globals.PaddingBottom = 5;
Alloy.Globals.headerHeight = 40;

Alloy.Globals.UploadPaddingLeft = 5;
Alloy.Globals.UploadPaddingTop = 5;
Alloy.Globals.CheckboxLeft = 200;

Alloy.Globals.uploadBottomBarHeight = 50;

// Colors
Alloy.Globals.TikklrCreateInnerBlack = "#202020";
Alloy.Globals.TikklrCreateBlack = "#2e2e2e";
Alloy.Globals.TikklrGreen = "#00aaaa";
Alloy.Globals.TikklrLightGreen = "#8ce1da";
Alloy.Globals.TikklrDarkGreen = "#005e5e";
Alloy.Globals.TikklrGray = "#ececec";
Alloy.Globals.TikklrBriefBackground = "#dadada";
Alloy.Globals.TikklrLightGray = "#dedede";
Alloy.Globals.TikklrDarkGray ="#8c8c8d";
Alloy.Globals.TikklrYellow = "#ffe700";
Alloy.Globals.TikklrBlack = "#0f0f0f";
Alloy.Globals.TikklrLoginBlack = "#333333";
Alloy.Globals.TikklrTextBlack = "#0a0a0a";
Alloy.Globals.TikklrUploadGray = "#707070";
Alloy.Globals.TikklrSettingsText = "#535353";
Alloy.Globals.TikklrBronze = "#8C502D";
Alloy.Globals.TikklrSilver = "#7F939D";
Alloy.Globals.TikklrGolden = "#B68C42";
Alloy.Globals.TikklrPlatinum = "#7FbEb";
Alloy.Globals.TikklrRed = "#B85555";
Alloy.Globals.TikklrRewardsRed = "#B04241";
Alloy.Globals.TikklrWhite = "#f8f8f8";
Alloy.Globals.TikklrRewardLightOrange = "#FFB846";
Alloy.Globals.TikklrRewardOrange = "#FFAB30";
Alloy.Globals.TikklrRewardDarkOrange = "#FF8A00";
Alloy.Globals.TikklrRewardLightBlue = "#005FB0";
Alloy.Globals.TikklrRewardBlue = "#0046A7";
Alloy.Globals.TikklrRewardLightGreen = "#00B45F";
Alloy.Globals.TikklrRewardGreen = "#00AA49";

// UI Computations
Alloy.Globals.containerHeight = Ti.Platform.displayCaps.platformHeight - Alloy.Globals.barHeight;
Alloy.Globals.PaddingLeft2 = 2 * Alloy.Globals.PaddingLeft;

Alloy.Globals.FollowFlag = 'commons_follow_user';
Alloy.Globals.FlagFlag = 'inappropriate_node';

// Test flight token: edc7ea2b-47d6-412c-9603-fb136123d1d8

// Unique Properties strings
Alloy.Globals.Properties = {};
Alloy.Globals.Properties.Consent = "consent";
Alloy.Globals.Properties.LicenseType = "licenseType";

// Notifications settings
Alloy.Globals.Properties.Notifications = {};
Alloy.Globals.Properties.Notifications.EnablePush = "notifications.enablePush";
Alloy.Globals.Properties.Notifications.PullMessages = "notifications.pullMessages";
Alloy.Globals.Properties.Notifications.NewFanNotice = "notifications.newFanNotice";
Alloy.Globals.Properties.Notifications.News = "notifications.news";
Alloy.Globals.Properties.Notifications.Stats = "notifications.stats";
Alloy.Globals.Properties.Notifications.ChannelNews = "notifications.channelNews";

//Privacy settings
Alloy.Globals.Properties.Privacy = {};
Alloy.Globals.Properties.Privacy.Photo = "privacy.photo";
Alloy.Globals.Properties.Privacy.Name = "privacy.name";
Alloy.Globals.Properties.Privacy.Location = "privacy.location";
Alloy.Globals.Properties.Privacy.About = "privacy.about";
Alloy.Globals.Properties.Privacy.Fans = "privacy.fans";
Alloy.Globals.Properties.Privacy.ChannelFollowed = "privacy.channelFollowed";

//Social settings
Alloy.Globals.Properties.Social = {};
Alloy.Globals.Properties.Social.Facebook = "social.facebook";
Alloy.Globals.Properties.Social.Twitter = "social.twitter";

//Drupal Globals
Alloy.Globals.Properties.Session = "session";
Alloy.Globals.Properties.Token = "token";

Alloy.Globals.Substance = 'Substance'; // use the friendly-name on iOS


