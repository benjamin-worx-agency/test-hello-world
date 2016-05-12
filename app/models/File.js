exports.definition = {  
	config: {
		"URL": "http://www.tikklr.com/api/entity_file",
		"adapter": {
			"type": "restapi",
			"collection_name": "File",
			"idAttribute": "fid"
		},
		"headers": { // your custom headers
			"Accept": "application/json, text/plain, */*",
			"X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
			"Cookie": Ti.App.Properties.getString("session") 
		},
		"model": "File"
	//	"debug": 0 //your root node
	},	
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			transform: function(){
				Ti.API.info("in File model transform:" + JSON.stringify(this));
				
				var model = this;
			
				return model;
			}
			
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			transform: function(){
				Ti.API.info("in Node collection transform:" + JSON.stringify(this));
				
				var model = this;
					
			
				return model;
			}
		});
		return Collection;
	}
};