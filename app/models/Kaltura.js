exports.definition = {
	config : {
		"model" : "Kaltura"
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			rewardId : "",
			title : "",
			tags : "",
			category : "",
			drupalCategoryId : "",
            kalturaMediaType : kalturaMediaTypes[Ti.Media.MEDIA_TYPE_VIDEO],
			uploadInProgress : 0,
			uploadNotInProgress : 1,
			uploadProgress : 0, //Uses values between 0 - 1
			setBrief : function (brief) {
				Ti.API.info("setting brief: " + JSON.stringify(brief));
				this.set("brief", brief);
			},
			uploadToKaltura : function(item) {
				this.uploadTokenAdd(item);
				this.set("uploadNotInProgress", 0);
				this.set("uploadInProgress", 1);
				this.set("uploadProgress", 0);
				this.set("uploadNotInProgress", 0);
				this.set('uploadProgressFor620px', '10');
			},
			transform : function() {
				var model = this;
				model['uploadInProgress'] = this.get('uploadInProgress');
				model['uploadNotInProgress'] = this.get('uploadNotInProgress');
				model['uploadProgress'] = this.get('uploadProgress');
				model['uploadProgressFor620px'] = this.get('uploadProgress') * 300 + 10 ;

				return model;
			},
			uploadTokenAdd : function(item) {
				var that = this;
				ks = Alloy.Globals.ks;
				if (Ti.Network.getOnline()) {
					mimeType = item.getMimeType();
					Ti.API.info("MimeType is: " + mimeType);
					Ti.API.info("item.getMimeType() is: " + item.getMimeType());
					
					var url = baseUrl + "?service=uploadtoken&action=add&ks=" + ks;

					var client = Ti.Network.createHTTPClient({
						// function called when the response data is available
						onload : function(e) {
							// function called in readyState DONE (4)
							var tokenIdElement = this.responseXML.getElementsByTagName('id');
							Ti.API.info("uploadToken->add response: " + this.responseText);
							
							if (tokenIdElement != null) {
								try {
									tokenId = tokenIdElement.item(0).text;
									Ti.API.info("uploadTokenId: " + tokenId);
									
									that.uploadTokenUpload(tokenId, item);
								} catch (e) {
									Ti.API.error('Error while parsing XML' + e);
								}
							}
						},
						onerror : function(e) {
							// function called in readyState DONE (4)
							Ti.API.error('uploadtoken->add onerror called, readyState = ' + this.readyState);
							Ti.App.fireEvent('uploadFailed');
						},
						timeout : 5000
					});

					// Prepare the connection
					client.open("POST", url);
					client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

					Ti.API.info("fileName is: " + item.name);
					Ti.API.info("fileSize is: " + item.getLength());
					
					var data = {
						"uploadToken:objectType" : 'KalturaUploadToken',
						"uploadToken:fileName" : item.name,
						"uploadToken:fileSize" : item.getLength()
					};

					// Send the request.
					client.send(data);
				} else {
					Ti.App.fireEvent('triggerError', {"message": "Please open network connection"});
					Ti.App.fireEvent('uploadFailed');
				}
			},
			uploadTokenUpload : function(tokenId, file) {
				var that = this;
				var url = baseUrl + '?service=uploadtoken&action=upload&ks=' + ks;
				
				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload : function(e) {
						// function called in readyState DONE (4)
						Ti.API.info('uploadToken->upload ' + this.responseText);
						var errorElement = this.responseXML.getElementsByTagName('error');
						
						if (errorElement.item.length > 0) {
							try {
								tokenId = errorElement.item(0).text;
								Ti.API.info("uploadToken ERROR RECIEVED FROM SERVER: " + tokenId);
							} catch (e) {
								Ti.API.error('Error while parsing XML' + e);
							}
							Ti.App.fireEvent('uploadFailed');
						} else { // If we don't have an error
							that.baseEntryAdd(tokenId);
						}
					},
					onerror : function(e) {
						// function called in readyState DONE (4)
						Ti.API.error('onerror called, readyState = ' + this.readyState);
						Ti.App.fireEvent('uploadFailed');
					},
					ondatastream : function(e) {
						// function called as data is downloaded
						Ti.API.info('ondatastream called, readyState = ' + this.readyState);
						that.set("uploadLabel", 'Uploading, please wait... ' + '100%');
						that.set("uploadProgress", 1);
					},
					onsendstream : function(e) {
						Ti.API.info('onsendstream called progress = ' + e.progress);
						//else on ios devices, calculate the progress of the upload using e.progress
						if (Math.round(e.progress * 100) <= 100) {
							that.set("uploadLabel", 'Uploading, please wait... ' + (Math.round(e.progress * 100)).toString().replace(".", "") + '%');
							that.set("uploadProgress", e.progress);
						}
					}
				});

				// Prepare the connection.
				client.open("POST", url);

				var data = {
					uploadTokenId : tokenId,
					fileData : file
				};

				Ti.API.info('url' + url);
				Ti.API.info('uploadTokenId' + tokenId);
				Ti.API.info('fileData' + file);
				
				// Send the request.
				client.send(data);
			},
			baseEntryAdd : function(tokenId) {
				that = this;
				var url = baseUrl + '?service=baseEntry&action=add&ks=' + ks;

				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload : function(e) {
						// function called in readyState DONE (4)

						Ti.API.info('baseEntry->add' + this.responseText);

						var entryIdElement = this.responseXML.getElementsByTagName('id');
						var entryNameElement = this.responseXML.getElementsByTagName('name');
						var entryDescriptionElement = this.responseXML.getElementsByTagName('description');
						var entryTagsElement = this.responseXML.getElementsByTagName('tags');
						var entryCategoriesElement = this.responseXML.getElementsByTagName('categories');
						
						if (entryIdElement != null) {
							try {
								var entryId = entryIdElement.item(0).text;
								var entryName = entryNameElement.item(0).text;
								var entryDescription = entryDescriptionElement.item(0).text;
								var tags = entryTagsElement.item(0).text;
								var kalturaMediaType = that.get('kalturaMediaType') ? that.get('kalturaMediaType') : kalturaMediaTypes[Ti.Media.MEDIA_TYPE_VIDEO];
								
								var user = Alloy.Models.User;

								var node = Alloy.createModel("Node", {
									type : "video",
									title : entryName,
									// brief : that.get('brief'),
									kaltura_tags : tags,
									author : user.get('uid'),
									og_group_ref: that.get('drupalCategoryId'),
									uploader: entryId
									// uploader: {entryid: entryId}
									// kaltura_entryid: entryId
								});
								Ti.API.info('saving: ' + JSON.stringify(node));
								node.save();

								that.baseEntryAddContent(entryId, tokenId);
							} catch (e) {
								Ti.API.error('Error while parsing XML' + e);
							}
						}
					},
					onerror : function(e) {
						// function called in readyState DONE (4)
						Ti.API.error('onerror called, readyState = ' + this.readyState);
						Ti.App.fireEvent('uploadFailed');
					}
				});

				// Prepare the connection.
				client.open("POST", url);
				client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				var data = {
					'entry:objectType' : 'KalturaMediaEntry',
					'entry:type' : "-1",
					'entry:name' : this.get('title'),
					'entry:mediaType' : this.getMediaTypeFromMimeType(mimeType),
					'entry:description' : "",
					'entry:tags' : this.get('tags'),
					'entry:categories' : this.get('category')
				};

				// Send the request.
				client.send(data);
			},
			getMediaTypeFromMimeType : function(mimeType) {
				Ti.API.info('Getting Kaltura type for mime type: ' + mimeType);

				var result = kalturaMediaTypes[Ti.Media.MEDIA_TYPE_VIDEO];
				//Default
				switch(mimeType) {
					case 'image/png':
						result = kalturaMediaTypes[Ti.Media.MEDIA_TYPE_PHOTO];
						break;
					default:
						result = kalturaMediaTypes[Ti.Media.MEDIA_TYPE_VIDEO];
				}

				Ti.API.info('Kaltura media type: ' + result);
				this.set("kalturaMediaType", result);
				return result;
			},
			baseEntryAddContent : function(entryId, tokenId) {
				var that = this;
				var url = baseUrl + '?service=baseEntry&action=addContent&ks=' + ks;

				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload : function(e) {
						// function called in readyState DONE (4)

						Ti.API.info('baseEntry->addContent: ' + this.responseText);
						that.uploadCompleted();
					},
					onerror : function(e) {
						// function called in readyState DONE (4)
						Ti.API.error('onerror called, readyState = ' + this.readyState);
						Ti.App.fireEvent('uploadFailed');
					}
				});

				// Prepare the connection.
				client.open("POST", url);
				client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				var data = {
					'entryId' : entryId,
					'resource:objectType' : 'KalturaUploadedFileTokenResource',
					'resource:token' : tokenId
				};

				// Send the request.
				client.send(data);
			},
			uploadCompleted : function() {
				//Create a new reward for the user from the brief.
				// alert("Your video has been successfully uploaded!");
				
				// Upload success
				Ti.App.fireEvent('triggerSuccess', {message: 'There goes your cherry'});
				
				Ti.App.fireEvent('showActionMenu');
				this.set("uploadInProgress", 0);
				this.set("uploadNotInProgress", 1);
				this.set("uploadLabel", "Uploading, please wait...");
				
				if(this.get('rewardId') != '') { //We need to add a reward for the uploaded content
				
					Ti.API.info("rewardId is: " + JSON.stringify(this.get('rewardId')));
					var briefReward = Alloy.createModel("Node", {
						id: this.get('rewardId'),
						nid: this.get('rewardId')
					});
					
					Ti.API.info("BriefRewardObject is: " + JSON.stringify(briefReward));
					
					briefReward.id = this.get('rewardId');
					briefReward.set('id', this.get('rewardId'));
					briefReward.nid = this.get('rewardId');
					briefReward.set('nid', this.get('rewardId'));
					
					briefReward.fetch(
						{
							"success" : function(e) {
								Ti.API.info("BriefReward is: " + JSON.stringify(e));
								Ti.API.info("BriefRewardTitle is: " + JSON.stringify(e.get('title')));
 								
 								//TODO: add check to see if the user has a reward for it already
								var myRewards = Alloy.createCollection('Node');
								
								var expirationDate = e.get('expiration_date');
								var currentDate = new Date(expirationDate * 1000);
								var currentFormattedDate = currentDate.getFullYear() + '-' + ( currentDate.getMonth() + 1) + '-' + currentDate.getDate(); //Currently supports dates and not hours
																	
								var rewardsParams = {"parameters[type]":"rewards",
								  "parameters[author]":Alloy.Models.User.get('uid'),
								  "parameters[expiration_date][value][value]":currentFormattedDate, "parameters[expiration_date][value][operator]": ">=", //Start time is less than current time
								  "sort": "created", "direction":"DESC", "pagesize": 10, "parameters[status]": 1,
								  "title": e.get('title') }; //Sorting and pagination

								var rewardLink = e.get('reward_link');
								var rewardType = e.get('reward_type');
								var rewardBrand = e.get('reward_brand_name');
								var title = e.get('title');
								var value = e.get('value');
								var rewardDescription = e.get('reward_description');
								var termsAndConditions = e.get('terms_and_conditions');
								
								Ti.API.info("Breif expiration date: " + currentFormattedDate);
								myRewards.fetch({ 
									"success": function(){
										Ti.API.info("User has that reward already, going to play page");
										
										Ti.App.fireEvent('triggerSuccess', {"message": "Keep tikking"});
										
										var briefToUpdate = that.get('brief');
										if (briefToUpdate != null && briefToUpdate.get('available') != null) {
											delete that['brief'];
											delete this['brief'];
										}
										
										//We pass the page in a timeout
										setTimeout(function() {
											Ti.App.fireEvent('attachWindow', { page : 'plays' }); 
												
										}, 1500);
									},
									//We need to catch the error call (meaning no entities returned)
									"error": function(e) {
										if(myRewards.length == 0) {
											var node = Alloy.createModel("Node", {
												type : "rewards",
												title : title,
												author : Alloy.Models.User.get('uid'),
												value: value,
												brand_logo: e.get('brand_logo'),
												expiration_date: expirationDate,
												reward_description: rewardDescription,
												reward_link: rewardLink,
												reward_type: rewardType,
												reward_brand_name: rewardBrand,
												terms_and_conditions: termsAndConditions
											});
										
										node.save(node, { "success": function() {
											var briefToUpdate = that.get('brief');
											if (briefToUpdate != null && briefToUpdate.get('available') != null) {
												var updatedAvailable = Number(briefToUpdate.get('available')) - 1;
	
												var node = {
													"type": "briefs",
													"available": updatedAvailable.toString()
												};
												
												briefToUpdate.save(node); //No need for a callback here.
											}
											
											Ti.App.fireEvent('triggerSuccess', {"message": "You just earned a reward"});
		
											//We pass the page in a timeout
											setTimeout(function() {
												Ti.App.fireEvent('attachWindow', { page : 'rewards' }); //Open the page after a reward has been added
											}, 1500);
										},
										"error": function (){
											Ti.App.fireEvent('triggerSuccess', {"message": "Keep tikking"});
										}});									
									}},
								'urlparams': rewardsParams
								});
							}
						}
					);
				} else { //If we don't add a reward, open the plays page
					Ti.App.fireEvent('attachWindow', { page : 'plays' });
				}
			}
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
		});
		return Collection;
	}
};

var baseUrl = "http://video.tikklr.com/api_v3/index.php";
var mimeType = Ti.Media.MEDIA_TYPE_VIDEO;
//Defualt to video
var kalturaMediaTypes = {};
kalturaMediaTypes[Ti.Media.MEDIA_TYPE_VIDEO] = 1;
kalturaMediaTypes[Ti.Media.MEDIA_TYPE_PHOTO] = 2;
// 5 //Audio in Kaltura
	
