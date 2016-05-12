exports.definition = {  
	config: {
		"URL": "http://www.tikklr.com/api/entity_message",
		"adapter": {
			"type": "restapi",
			"collection_name": "Message",
			"idAttribute": "mid"
		},
		"headers": { // your custom headers
			"Accept": "application/json, text/plain, */*",
			"X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
			"Cookie": Ti.App.Properties.getString("session") 
		},
		"model": "Message"
	},	
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			transform: function(){
				Ti.API.info("in message model transform:" + JSON.stringify(this));
				
				var model = this;

				model['text'] = this.get('text');
												
				return model;
			}
			
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			transform: function(){
				Ti.API.info("in Message collection transform:" + JSON.stringify(this));
				
				var model = this;

				model['text'] = this.get('text');
												
				return model;
			}
		});
		return Collection;
	}
};