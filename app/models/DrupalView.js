exports.definition = {  
	config: {
		"adapter": {
			"type": "restapi",
			"collection_name": "View",
			"idAttribute": "uid"
		},
		"headers": { // your custom headers
			"Accept": "application/json, text/plain, */*",
			"X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
			"Cookie": Ti.App.Properties.getString("session") 
		},
		"model": "DrupalView",
		// "parentNode": list,
		"debug": 0 //your root node
	},	
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			url: function() {
				var url =  Alloy.Globals.drupalApiUrl + "views/" + this.viewName;
				Ti.API.info('New View URL: ' + url);
				return url;
			},
			transform: function(){
				Ti.API.info("in DrupalView model transform:" + JSON.stringify(this));
				
				var model = this;

				model['title'] = this.get('title');
 				model['description'] = this.get('description');
 	
				if(this.get('type') == 'video') { //Handle video node
					model['thumb'] = 'http://video.tikklr.com/p/'  + Alloy.Globals.partnerId + '/thumbnail/entry_id/' + this.get('uploader') + '/height/800/type/1/quality/100';

					model['tags'] = this.get('kaltura_tags');
					model['kaltura_tags'] = this.get('kaltura_tags');
					model['uploader'] = this.get('uploader');
					model['views'] = '130,000 views'; // TODO: take entry views
					model['categoryImage'] = 'star.png'; // TODO: take entry views
					model['followers'] = '12,365 followers'; // TODO: take entry views	
				}
				
				if(this.get('type') == 'briefs') { //Handle briefs node
					model['thumb'] = this.get('thumb');
					model['body'] = this.get('body').value;
					model['summary'] = this.get('body').summary;
					model['description'] = model['summary'];	
					model['voucher_value'] = this.get('voucher_value');
				}
				
				if(this.get('type') == "video") {
					model['isVideo'] = true;
					model['isThumb'] = false;	
				} else { //Rest of the 
					model['isVideo'] = false;
					model['isThumb'] = true;
				}
				
				if(this.get('entity_type') == 'user' || this.get('type') == 'user') {
					if (this.viewName == 'commons_follow_user_following') {
						model['isFollowed'] = true;
						model['isNotFollowed'] = false;	
					} else if(this.viewName == 'commons_follow_user_following') { //Followers 
						//TODO: get if is following.
						if(model['uid'] != Alloy.Models.User.uid) { //Check if user is already followed by current User
							if(typeof Alloy.Collections.Following.get(model['uid']) != 'undefined') {
								model['isFollowed'] = false;
								model['isNotFollowed'] = true;
							}
						}
					} else  { // other
						
					}
				}
							
				return model;
			},
			getDrupalFieldValue: function(fieldName) {
				if(this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) {
					return this.get(fieldName).und[0].value;	
				} 
	
				return null;
			},
			setDrupalFieldValue: function(fieldName, fieldValue) {
				var drupalValue = {'und': [{'value': fieldValue}]};
				this.set(fieldName, drupalValue);	
			},
			
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			url: function() {
				var url =  Alloy.Globals.drupalApiUrl + "views/" + this.viewName;
				Ti.API.info('New View URL: ' + url);
				return url;
			},
			transform: function(){
				Ti.API.info("in DrupalView collection transform:" + JSON.stringify(this));
				
				var model = this;
				model['name'] = this.name;
				model['thumb'] = 'http://video.tikklr.com/p/'  + Alloy.Globals.partnerId + '/thumbnail/entry_id/' + this.get('uploader') + '/height/800/type/1/quality/100';
				model['title'] = this.get('title');
				model['description'] = this.get('description');
				model['tags'] = this.get('tags');
				 
				return model;
			},
		});
		return Collection;
	}
};