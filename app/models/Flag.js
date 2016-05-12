exports.definition = {  
	config: {
		
		"URL": "http://www.tikklr.com/api/flag",
		"adapter": {
			"type": "restapi",
			"collection_name": "Flag",
			"idAttribute": "fid"
		},
		"headers": { // your custom headers
			"Accept": "application/json, text/plain, */*",
			"X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
			"Cookie": Ti.App.Properties.getString("session")
		},
		"model": "Flag",
		// "parentNode": list,
		"debug": 0 //your root node
	},	
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			url: function(){
				return Alloy.Globals.drupalApiUrl + 'flag';
			},
			transform: function(){
				Ti.API.info("in Flag model transform:" + JSON.stringify(this));
				
				var model = this;
				
				return model;
			},
			countAll: function(nameToCount, callType, entityId) {
				if (Ti.Network.getOnline()) {
					var url =  Alloy.Globals.drupalApiUrl +"flag/countall";

					var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload : function(e) {
							Ti.API.info("Count all returned with: " + JSON.stringify(e));
							var response = JSON.parse(this.responseText);
							Ti.App.fireEvent('countFlagFinished', {'nameToCount': nameToCount, 'count': response.count, 'callType': callType});
							Ti.API.info(this.responseText);
						},
						onerror : function(e) {
							// function called in readyState DONE (4)
							Ti.API.error('onerror called, in countAll readyState = ' + this.readyState + "e: " + JSON.stringify(e));
							Ti.App.fireEvent('countFlagFinished', {'nameToCount': nameToCount, 'count': 0, 'callType': callType});
						},
						timeout : 5000
					});

					// Prepare the connection
					client.open("POST", url);
					
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					client.setRequestHeader('Cookie', Ti.App.Properties.getString("session"));
					client.setRequestHeader("X-CSRF-TOKEN", Ti.App.Properties.getString("token"));
					client.setRequestHeader('Accept', 'application/json');

					if(callType == 'uid') {
						var data = {
							"flag_name" : nameToCount,
							"uid" : entityId
						};	
					} else {
						var data = {
							"flag_name" : nameToCount,
							"entity_id" : entityId
                        };
					}
					
					// Send the request
					client.send(data);
				} else {
					Ti.App.fireEvent('triggerError', {"message": "Please open network connection"});
				}
			},
			flag : function(action, flag_name, entity_id, content_id, uid) {
				if (Ti.Network.getOnline()) {
					var url =  Alloy.Globals.drupalApiUrl +"flag/flag";

					var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload : function(e) {
							Ti.API.info("Flag returned with: " + JSON.stringify(e));
							var response = JSON.parse(this.responseText);
							Ti.App.fireEvent('flagFinished', {'flag_name': flag_name, 'entity_id': entity_id ,'flag_type': action});
							Ti.API.info(this.responseText);
						},
						onerror : function(e) {
							// function called in readyState DONE (4)
							Ti.API.error('onerror called, in flag readyState = ' + this.readyState + "e: " + JSON.stringify(e));
							Ti.App.fireEvent('flagFinished', {'flag_name': flag_name, 'entity_id': entity_id ,'flag_type': action});
						},
						timeout : 5000
					});

					// Prepare the connection
					client.open("POST", url);
					
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					client.setRequestHeader('Cookie', Ti.App.Properties.getString("session"));
					//client.setRequestHeader('Cookie', "XDEBUG_SESSION=PHPSTORM");
					client.setRequestHeader("X-CSRF-TOKEN", Ti.App.Properties.getString("token"));
					client.setRequestHeader('Accept', 'application/json');

					if(uid == '') { //If empty user ID than we use the logged in user
						uid = Alloy.Models.User.get('uid'); //Current user id
					}
					var data = {
						'action': action,
						"flag_name" : flag_name,
						"entity_id" : entity_id,
						"content_id" : entity_id,
						'uid': uid,
						'flaging': 'true'
					};
										
					// Send the request
					client.send(data);
				} else {
					Ti.App.fireEvent('triggerError', {"message": "Please open network connection"});
				}
			},
			isFlagged: function(flag_name, entity_id, uid, callback) {
				if (Ti.Network.getOnline()) {
					var url =  Alloy.Globals.drupalApiUrl +"flag/is_flagged";

					var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload : function(e) {
							Ti.API.info("is_flagged returned with: " + JSON.stringify(e));
							var response = JSON.parse(this.responseText);
							Ti.API.info("is_flagged responseText: " + response);
							Ti.API.info("is_flagged entity_id: " + entity_id);
							// Ti.API.info("is_flagged callback: " + callback);
					
							var result = {"entity_id": entity_id, "isFollowing": response}; 
							callback(result);
						},
						onerror : function(e) {
							// function called in readyState DONE (4)
							Ti.API.error('onerror called, in flag readyState = ' + this.readyState + "e: " + JSON.stringify(e));
							//TODO: handle errors on the callback
							callback(false);
						},
						timeout : 5000
					});

					// Prepare the connection
					client.open("POST", url);
					
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					client.setRequestHeader('Cookie', Ti.App.Properties.getString("session"));
					//client.setRequestHeader('Cookie', "XDEBUG_SESSION=PHPSTORM");
					client.setRequestHeader("X-CSRF-TOKEN", Ti.App.Properties.getString("token"));
					client.setRequestHeader('Accept', 'application/json');

					if(uid == '') { //If empty user ID than we use the logged in user
						uid = Alloy.Models.User.get('uid'); //Current user id
					}
					
					var data = {
						"flag_name" : flag_name,
						"entity_id" : entity_id,
						'uid': uid
					};
										
					// Send the request
					client.send(data);
				} else {
					Ti.App.fireEvent('triggerError', {"message": "Please open network connection"});
				}
			}
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			transform: function(){
				Ti.API.info("in Flag collection transform:" + JSON.stringify(this));
				
				var model = this;
								
				return model;
			},
			url: function(){
				return Alloy.Globals.drupalApiUrl + 'flag';	
			}
		});
		return Collection;
	}
};