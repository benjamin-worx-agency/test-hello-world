var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Titanium.App.idleTimerDisabled = true;

Alloy.Globals.VideoTimeLimit = 3e4;

Alloy.Globals.VideoQuality = Titanium.Media.QUALITY_MEDIUM;

Alloy.Globals.isIos7Plus = true && parseInt(Ti.Platform.version.split(".")[0]) >= 7;

Alloy.Globals.iPhoneTall = true && "iphone" == Ti.Platform.osname && 568 == Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.isIpad = true && ("ipad" == Ti.Platform.osname || "iPad" == Ti.Platform.osname || "iPad 2" == Ti.Platform.osname);

Alloy.Globals.ks = "";

Alloy.Globals.partnerId = 102;

Alloy.Globals.adminSecret = "b01370367cb8c6b2722ca7404eb91671";

Alloy.Globals.secret = "fbbfef797ca9dbfebb2acd661adce4dd";

Alloy.Models.KalturaBaseUrl = "http://video.tikklr.com/";

Alloy.Models.KalturaAPIUrl = Alloy.Models.KalturaBaseUrl + "api_v3/index.php";

Alloy.Globals.drupalBaseUrl = "http://www.tikklr.com/";

Alloy.Globals.drupalApiUrl = Alloy.Globals.drupalBaseUrl + "api/";

Alloy.Globals.drupalPublicImageUrlBase = "http://www.tikklr.com/sites/default/files/styles/254x175/public/pictures/";

Alloy.Globals.FeaturedCategoryId = 448;

Alloy.Globals.animationDuration = 200;

Alloy.Globals.topZindex = 2e3;

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

Alloy.Globals.TikklrCreateInnerBlack = "#202020";

Alloy.Globals.TikklrCreateBlack = "#2e2e2e";

Alloy.Globals.TikklrGreen = "#00aaaa";

Alloy.Globals.TikklrLightGreen = "#8ce1da";

Alloy.Globals.TikklrDarkGreen = "#005e5e";

Alloy.Globals.TikklrGray = "#ececec";

Alloy.Globals.TikklrBriefBackground = "#dadada";

Alloy.Globals.TikklrLightGray = "#dedede";

Alloy.Globals.TikklrDarkGray = "#8c8c8d";

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

Alloy.Globals.containerHeight = Ti.Platform.displayCaps.platformHeight - Alloy.Globals.barHeight;

Alloy.Globals.PaddingLeft2 = 2 * Alloy.Globals.PaddingLeft;

Alloy.Globals.FollowFlag = "commons_follow_user";

Alloy.Globals.FlagFlag = "inappropriate_node";

Alloy.Globals.Properties = {};

Alloy.Globals.Properties.Consent = "consent";

Alloy.Globals.Properties.LicenseType = "licenseType";

Alloy.Globals.Properties.Notifications = {};

Alloy.Globals.Properties.Notifications.EnablePush = "notifications.enablePush";

Alloy.Globals.Properties.Notifications.PullMessages = "notifications.pullMessages";

Alloy.Globals.Properties.Notifications.NewFanNotice = "notifications.newFanNotice";

Alloy.Globals.Properties.Notifications.News = "notifications.news";

Alloy.Globals.Properties.Notifications.Stats = "notifications.stats";

Alloy.Globals.Properties.Notifications.ChannelNews = "notifications.channelNews";

Alloy.Globals.Properties.Privacy = {};

Alloy.Globals.Properties.Privacy.Photo = "privacy.photo";

Alloy.Globals.Properties.Privacy.Name = "privacy.name";

Alloy.Globals.Properties.Privacy.Location = "privacy.location";

Alloy.Globals.Properties.Privacy.About = "privacy.about";

Alloy.Globals.Properties.Privacy.Fans = "privacy.fans";

Alloy.Globals.Properties.Privacy.ChannelFollowed = "privacy.channelFollowed";

Alloy.Globals.Properties.Social = {};

Alloy.Globals.Properties.Social.Facebook = "social.facebook";

Alloy.Globals.Properties.Social.Twitter = "social.twitter";

Alloy.Globals.Properties.Session = "session";

Alloy.Globals.Properties.Token = "token";

Alloy.Globals.Substance = "Substance";

Alloy.createController("index");


