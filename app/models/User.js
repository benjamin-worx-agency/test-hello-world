// User model 
exports.definition = {  
	config: {
		"adapter": {
			"type": "restapi",
			"idAttribute": "uid"
		},
		"headers": { // your custom headers
			"Accept": "application/json",
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
			"Cookie": Ti.App.Properties.getString("session") ,
		},
		// "parentNode": function(data) {
			// // return data; 
			// // return [data]; //Returns the data as a single entity in array (used in RestApi)
		// },
		"model": "User",
		"debug": 0
	},
	
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			url: function() {
				return Alloy.Globals.drupalApiUrl + "user"; 
			},
			transform: function(){
				var model = this;
				Ti.API.log("user model is: " + JSON.stringify(model));
								
				model['pictureUrl'] = (this.get("picture") && this.get("picture") != null && this.get("picture") != 0 && this.get("picture").url != undefined) ? this.get("picture").url : "profile.png";
				model['realname'] = this.get("realname");
				model['@realname'] = "@" + this.get('realname');
	
				if(!model.realname || !model['@realname']) { //Names not set changing to other names.
					model.realname = this.get("name");
					model['@realname'] = "@" + this.get('name');
				}
				
				model['name'] = this.get("name");
				model['mail'] = this.get("mail");
				model['uid'] = this.get("uid");
				model['id'] = this.get("id");
				model['mail'] = this.get("mail");
				model['firstName'] = this.getDrupalFieldValue('field_name_first');
				model['lastName'] = this.getDrupalFieldValue('field_name_last');
				model['bio'] = this.getDrupalFieldValue('field_bio');

				model['isFollowed'] = false;
				model['isNotFollowed'] = true;	
				
				if(model['uid'] != Alloy.Models.User.uid) { //Check if user is already followed by current User
					if(typeof Alloy.Collections.Following.get(model['uid']) != 'undefined') {
						model['isFollowed'] = true;
						model['isNotFollowed'] = false;	
					}
				}

				if(this.get('field_tikklr_location') && this.get('field_tikklr_location').und && this.get('field_tikklr_location').und[0].country) {
					model['location'] = this.get('field_tikklr_location').und[0].country;	
				} 
	
				return model;
			},
			getToken: function() {
				var that = this;
				if(Ti.Network.getOnline())
				{
					var url = Alloy.Globals.drupalApiUrl + "entity_user/token";
			
					var client = Ti.Network.createHTTPClient({
						onload: function(e) {
							var response = JSON.parse(this.responseText); //Parse JSON response to object
							
							Titanium.App.Properties.setString(Alloy.Globals.Properties.Token, response.token);
							
							Ti.API.info('Token success, Headers are = ' + JSON.stringify(that.config.headers));
							that.config.headers['X-CSRF-TOKEN'] = response.token;
							Ti.API.info('Token success, Response is = ' + JSON.stringify(response));
							Ti.App.fireEvent('tokenSuccess');
						},
						onerror: function(e) {
							Ti.API.info('onerror called, this = ' + JSON.stringify(this));Ti.API.info('onerror called, this = ' + JSON.stringify(this));
							Ti.API.info('onerror called, this = ' + JSON.stringify(e));
							Ti.App.fireEvent('tokenFailed');
						},
						timeout:20000
					});
				
					client.open("POST", url);
					
					// Prepare the connection
					client.setRequestHeader('Content-Type', 'application/json');
					client.setRequestHeader("Accept", "application/json");
					client.setRequestHeader("Cookie", Titanium.App.Properties.getString(Alloy.Globals.Properties.Session));
										
				 	// Send the request.
			 		client.send();
			 	}
			},
			login: function(username, pass) {
				var that = this;
				if(Ti.Network.getOnline())
				{
					var url = Alloy.Globals.drupalApiUrl + "entity_user/login.json";
			
					var client = Ti.Network.createHTTPClient({
						onload: function(e) {
							var response = JSON.parse(this.responseText); //Parse JSON response to object
							var session = response.session_name + '=' + response.sessid;
							Titanium.App.Properties.setString(Alloy.Globals.Properties.Session, session);
							that.config.headers['Cookie'] = session;
							Ti.API.info('Login success, this = ' + JSON.stringify(this));
							Ti.API.info('Login success, session is = ' + response.session_name + '=' + response.sessid);
							Ti.App.fireEvent('loginSuccess', {"userId": response.user.uid});
						},
						onerror: function(e) {
							Ti.API.info('login failed, this = ' + JSON.stringify(this));
							Ti.API.info('login failed, e = ' + JSON.stringify(e));
							Ti.App.fireEvent('loginFailed');
						},
						timeout:20000
					});
					
					client.open("POST", url);
					
					// Prepare the connection
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					client.setRequestHeader("Accept", "application/json");
						
					var data =	{
						"username" : username,
						"password": pass
					};
					
					//this logic distinguishes between email addresses and usernames.
					//I'm leaving this here for now, in case we will decide to implement support for this on the backend.
					// var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
					// if (emailRegex.test(username)) {
						// data["mail"] = username;
					// } else {
						// data["username"] = username;
					// }
					Ti.API.info("logging in: " + JSON.stringify(data));
				 	// Send the request.
			 		client.send(data);
		 		}
			},
			isLoggedIn: function(){
				//Use connect function
				var drupalToken = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
				var drupalSession = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
				
				Ti.API.info('---drupalToken---');
				Ti.API.info(drupalToken);
				Ti.API.info('---drupalSession---');
				Ti.API.info(drupalSession);
				
				var url = Alloy.Globals.drupalApiUrl + "system/connect.json";
				var that = this;
				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload: function(e) {

						var response = JSON.parse(this.responseText); //Parse JSON response to object
						
						if(response.user && response.user.uid == 0){ //Anonymous user
							Ti.App.fireEvent('connectFailed');
							return false;
						}

						Ti.API.info('Connect success, user is = ' + JSON.stringify(response.user));
						Ti.App.fireEvent('connectSuccess', {'userId': response.user.uid});
						
						
            /**** NOTIFICARE ****/
           
           Ti.API.info('-----notificare-----');
           
            var Notificare = require("ti.notificare");
            
            var deviceTokenSuccess = function(e) {
              Ti.API.info('---e.deviceToken---');
              Ti.API.info(e.deviceToken);
              Notificare.userID = Alloy.Models.User.get("uid");
              Notificare.userName = Alloy.Models.User.get("name");
              Notificare.registerDevice(e.deviceToken);
            };
            var deviceTokenError = function(e) {
              Ti.API.info('---deviceTokenErrorCalled!! e:---');
              Ti.API.info(e);
            };
            var receivePush = function(e) {
              Ti.API.info('---receivePush called!! e:---');
              Ti.API.info(e);
              if (Ti.App.appIsPaused) {
                Ti.App.pushMessage = e.data;
              } else {
                Notificare.openNotification(e.data);
                Ti.App.pushMessage = '';
              }
            };
              
            Notificare.addEventListener('ready',function(e){
              Ti.API.info('---Notificare ready----');
              if (Ti.Platform.name == "iPhone OS"){
                if (parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
                  // Wait for user settings to be registered before registering for push notifications
                  Ti.API.info('-----addEventListener usernotificationsettings-----');
                  Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
                      Ti.API.info('---usernotificationsettings called!!!----');
                    // Remove event listener once registered for push notifications
                    Ti.API.info('---inside----');
                    Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
                    Ti.Network.registerForPushNotifications({
                      success: deviceTokenSuccess,
                      error: deviceTokenError,
                      callback: receivePush
                    });
                    Notificare.registerUserNotifications();
                  });
                  // Register notification types to use
                  Ti.App.iOS.registerUserNotificationSettings({
                    types: [
                    Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
                    Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
                    Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
                    ]
                  });
                }
                // For iOS 7 and earlier
                else {
                  Ti.Network.registerForPushNotifications({
                    // Specifies which notifications to receive
                    types: [
                    Ti.Network.NOTIFICATION_TYPE_BADGE,
                    Ti.Network.NOTIFICATION_TYPE_ALERT,
                    Ti.Network.NOTIFICATION_TYPE_SOUND
                    ],
                    success: deviceTokenSuccess,
                    error: deviceTokenError,
                    callback: receivePush
                  });
                }
              }
            });
					},
					onerror: function(e) {
						Ti.API.info('Connect failed called, this = ' + JSON.stringify(this));
						Ti.App.fireEvent('connectFailed');
					},
					timeout:20000
				});
			
				client.open("POST", url);
			
				// Prepare the connection
				client.setRequestHeader("Accept", "application/json");
				client.setRequestHeader('Content-Type', 'application/json');
				
				if(drupalSession) {
					client.setRequestHeader("Cookie", drupalSession);
				}

				if(drupalToken) {
					client.setRequestHeader("X-CSRF-TOKEN", drupalToken);
				}
								
				Ti.API.info("Session is: " + drupalSession);
				Ti.API.info("Token is: " + drupalToken);
								
			 	// Send the request.
		 		client.send();
			},
			logout: function(){
				if(Ti.Network.getOnline()) {
					
					var url = Alloy.Globals.drupalApiUrl + "entity_user/logout";
				 	
				 	var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload: function(e) {
							Ti.App.fireEvent("logoutSuccess");
							Ti.API.info(JSON.stringify(e));
							Ti.API.info(JSON.stringify(this));
						},
						onerror: function(e) {
							Ti.App.fireEvent("logoutFailed");
							// function called in readyState DONE (4)
							Ti.API.info('logout called, readyState = ' + JSON.stringify(this));
						},
						timeout:20000
					});
					
					client.open("POST", url);
					
					// Prepare the connection
					client.setRequestHeader('Content-Type', 'application/json');
					
					var token = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
					var session = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
					
					if(session)
						client.setRequestHeader("Cookie", session);
					
					if(token)
						client.setRequestHeader("X_CSRF_TOKEN", token);
				
					Titanium.App.Properties.setString(Alloy.Globals.Properties.Session, "");
					Titanium.App.Properties.setString(Alloy.Globals.Properties.Token, "");
	
					// Send the request.
					client.send();
				}
		
			},
			register: function(username, password){
				if(Ti.Network.getOnline()){
					var url = Alloy.Globals.drupalApiUrl + "entity_user/register";
				 	
				 	var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload: function(e) {
							Ti.API.info(JSON.stringify(e));
							Ti.API.info(JSON.stringify(this));
							Ti.App.fireEvent('registerSuccess', e);
						},
						onerror: function(e) {
							// function called in readyState DONE (4)
							Ti.App.fireEvent('registerFailed');
							Ti.App.fireEvent('triggerError',{message: 'Drupal Register Error'});
							Ti.API.info('Error register = ' + JSON.stringify(this));
						},
						timeout:20000
					});
	
					client.open("POST", url);
					
					// Prepare the connection
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					
							
					var data =	{
						"username": username,
						"mail": username,
						"password": password,
						"group_access[und]": 0
					};
				
					// Send the request.
					client.send(data);
				}
			},
			forgotPassword: function(email){
					
				if(Ti.Network.getOnline()){
					var url = Alloy.Globals.drupalBaseUrl + "/user/password";
				 	
				 	var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload: function(e) {
							Ti.API.info(JSON.stringify(e));
							Ti.API.info(JSON.stringify(this));
							Ti.App.fireEvent('forgotSuccess');
						},
						onerror: function(e) {
							// function called in readyState DONE (4)
							Ti.App.fireEvent('forgotFailed');
							Ti.App.fireEvent('triggerError',{message: 'Drupal Register Error'});
							Ti.API.info('Error register = ' + JSON.stringify(this));
						},
						timeout:20000
					});
					client.open("POST", url);
					
					// Prepare the connection
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
							
					var data =	{
						'form_id': 'user_pass',
						"name": email,
						"op": "E-mail new password"
					};
				
					// Send the request.
					client.send(data);
				}
			},
			getFollowers: function (){
				if(Ti.Network.getOnline()){
					Ti.API.info('In get Followers ' + JSON.stringify(this));
					var url = Drupal.settings.basePath + '/views/ajax';
				 	
				 	var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload: function(e) {
							Ti.API.info('get Followers success: ' + JSON.stringify(e));
							Ti.API.info(JSON.stringify(e));
							Ti.API.info(JSON.stringify(this));
							Ti.App.fireEvent('followersSuccess');
						},
						onerror: function(e) {
							// function called in readyState DONE (4)
							Ti.App.fireEvent('followersFailed');
							Ti.App.fireEvent('triggerError',{message: 'Cant get user followers'});
							Ti.API.info('Error register = ' + JSON.stringify(this));
						},
						timeout:20000
					});
					client.open("POST", url);
					
					// Prepare the connection
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					
					// Send the request.
					client.send();
				}	
			},
			getDrupalFieldValue: function(fieldName) {
				if(this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) {
					return this.get(fieldName).und[0].value;	
				} 
	
				return null;
			},
			setDrupalFieldValue: function(fieldName, fieldValue) {
				var drupalValue = "";
				if(this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) {
					drupalValue = this.get(fieldName);
					drupalValue.und[0].value = fieldValue;
					drupalValue.und[0].safe_value = fieldValue;
				} else {
					drupalValue = {'und': [{'value': fieldValue}]};
				}
				
				// this.set(fieldName, drupalValue);
				return drupalValue;
			},
		});
		return Model;
	}
};
