
exports.baseController = "tikkGallery";

var params = {"parameters[user]": Alloy.Models.User.get('uid'), 'pagesize': 10, "parameters[type]": "commons_activity_streams_node_created"};

$.loadGallery($.Messages, params, null, null);

