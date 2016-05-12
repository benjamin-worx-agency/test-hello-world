exports.definition = {  
	config: {
		"adapter": {
			"type": "restapi",
			"collection_name": "Node",
			"idAttribute": "nid"
		},
		"headers": { // your custom headers
			"Accept": "application/json, text/plain, */*",
			"X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
			"Cookie": Ti.App.Properties.getString("session") 
		},
		"model": "Node",
		// "parentNode": list,
		"debug": 0 //your root node
	},	
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			transform: function(){
				Ti.API.info("in Node model transform:" + JSON.stringify(this));
				
				var model = this;

				model['title'] = this.get('title');
 				model['description'] = this.get('description');
 	
				if(this.get('type') == 'video') { //Handle video node
					model['thumb'] = 'http://video.tikklr.com/p/' + Alloy.Globals.partnerId + '/thumbnail/entry_id/' + this.get('uploader') + '/height/800/type/1/quality/100';
					model['tags'] = this.get('kaltura_tags');
					model['kaltura_tags'] = this.get('kaltura_tags');
					model['entryId'] = this.get('uploader');
					model['views'] = '130,000 views'; // TODO: take entry views
					model['categoryImage'] = 'star.png'; // TODO: take entry views
					model['followers'] = '12,365 followers'; // TODO: take entry views
					model['isVideo'] = true;
					model['isThumb'] = false;	
				}
				
				if(this.get('type') == 'reward') {
					model['terms_and_conditions'] = this.get('terms_and_conditions');
				}
			
				if(this.get('type') == 'briefs') { //Handle briefs node
					// model['thumb'] = this.get('thumb');
					
					model['thumb'] = "brandsPayDemo.png";
					if(this.get('image') && this.get('image').file && this.get('image').file.fileUrl) {
						model['thumb'] = this.get('image').file.fileUrl;	
					}
										
					Ti.API.info("model['thumb']" + model['thumb']);
					var body = this.get('body');
					if(typeof body != 'undefined') {
						model['body'] = this.get('body').value;
						model['summary'] = this.get('body').summary;
						model['description'] = model['summary'];		
					}
					
					model.isSelfie = this.get('selfie_tikk') ? true : false;
					model.isVideo = this.get('video_tikk') ? true : false;
					model.isThumbAllowed = this.get('tikk_options') ? true : false;
					
					if(model.isSelfie) {
						model['selfieImage'] = "selfie-gray.png";	
					} else {
						model['selfieImage'] = "selfie-dead.png";
					}
					
					if(model.isVideo) {
						model['isVideoImage'] = "video-gray.png";	
					} else {
						model['isVideoImage'] = "video-dead.png";
					}

					if(model.isThumbAllowed) {
						model['thumbAllowedImage'] = "photo-gray.png";	
					} else {
						model['thumbAllowedImage'] = "photo-dead.png";
					}
				
				}
				
				Ti.API.info("Model in the end is: " + JSON.stringify(model));
			
				return model;
			},
			url: function () {
				return Alloy.Globals.drupalApiUrl + "entity_node";
			}
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			transform: function(){
				Ti.API.info("in Node collection transform:" + JSON.stringify(this));
				
				var model = this;

				model['title'] = this.get('title');
 				model['description'] = this.get('description');
 	
				if(this.get('type') == 'video') { //Handle video node
					model['thumb'] = 'http://video.tikklr.com/p/' + Alloy.Globals.partnerId + '/thumbnail/entry_id/' + this.get('uploader') + '/height/800/type/1/quality/100';
					model['tags'] = this.get('kaltura_tags');
					model['kaltura_tags'] = this.get('kaltura_tags');
					model['entryId'] = this.get('uploader');
					model['views'] = '130,000 views'; // TODO: take entry views
					model['categoryImage'] = 'star.png'; // TODO: take entry views
					model['followers'] = '12,365 followers'; // TODO: take entry views	
				}
				
				if(this.get('type') == 'briefs') { //Handle briefs node
					// model['thumb'] = this.get('thumb');
					
					model['thumb'] = "brandsPayDemo.png";
					if(this.get('image') && this.get('image').file && this.get('image').file.fileUrl) {
						model['thumb'] = this.get('image').file.fileUrl;	
					}
										
					Ti.API.info("model['thumb']" + model['thumb']);
					var body = this.get('body');
					if(typeof body != 'undefined') {
						model['body'] = this.get('body').value;
						model['summary'] = this.get('body').summary;
						model['description'] = model['summary'];		
					}
					
					model.isSelfie = this.get('selfie_tikk') ? true : false;
					model.isVideo = this.get('video_tikk') ? true : false;
					model.isThumbAllowed = this.get('tikk_options') ? true : false;
					
					if(model.isSelfie) {
						model['selfieImage'] = "selfie-gray.png";	
					} else {
						model['selfieImage'] = "selfie-dead.png";
					}
					
					if(model.isVideo) {
						model['isVideoImage'] = "video-gray.png";	
					} else {
						model['isVideoImage'] = "video-dead.png";
					}

					if(model.isThumbAllowed) {
						model['thumbAllowedImage'] = "photo-gray.png";	
					} else {
						model['thumbAllowedImage'] = "photo-dead.png";
					}
				
				}
				
				if(this.get('type') == "video") {
					model['isVideo'] = true;
					model['isThumb'] = false;	
				}
				
				Ti.API.info("Model in the end is: " + JSON.stringify(model));
			
				return model;
			},
			url: function () {
				return Alloy.Globals.drupalApiUrl + "entity_node";
			}
		});
		return Collection;
	}
};