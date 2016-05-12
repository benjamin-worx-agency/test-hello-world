var FileLoader = require(WPATH('file_loader'));

var args = arguments[0] || {},
onError = null,
onDone = null,
isLoaded = false,
activity = null,
destroyed = false;

args = _.extend({
  'autoload': true,
  'gethires': false
}, args);

// convert children to args based on role
if (args.children) {

	_.each(args.children, function(child) {

		// fix: https://jira.appcelerator.org/browse/TC-3583
		if (!child) {
			return;
		}

		var role = child.role;

		if (role) {
			args[role] = child;
		}
	});
}

// delete irrelevant args
delete args.id;
delete args.__parentSymbol;
delete args.children;

applyProperties(args);

if( args.autoload && args.autoload != "false" ){
  load();
}

if( _.has(args,'activityindicator') && args.activityindicator ){
  activity = args.activityindicator;
  $.RemoteImage.add( args.activity );
}

//Launch garbage collection
gc();

function isValidUrl(url) {

	if(typeof url == 'string') {
		if(url.indexOf("http://") != -1 || url.indexOf("https://") != -1) {
			return true;	
		}
	}
	return false;
}

function load(){

  var url = getImageURL( args.image );
  
  var isUrl = isValidUrl(url);
  
  Ti.API.info("In widget.js load - url ["+ url + "] isUrl [" + isUrl +"] args.image [" + args.image + "]" );
  
  if( !isUrl || isLoaded ){
    return;
  }

  if( activity ){
    activity.show();
  }
	
	if(isUrl) {
		FileLoader.download( url )
	    .then(_display)
	    .fail(_error)
	    .done();
	}else if(typeof url != 'undefined'){ //Try to load the file locally
		_display(url);
	}
}


function _retry(e){

  return; //We don't support retry on tap
  e.cancelBubble = true;

  if( _.has(args,'loadingerror') ){
    $.RemoteImage.remove( args.loadingerror );
    // args.loadingerror.removeEventListener('singletap',_retry);
  }

  load();

}


function _error( error ){

  if( destroyed ){
    return;
  }

  if( activity ){
    activity.hide();
  }

  Ti.API.error(error);

  if( _.has(args,'loadingerror') ){
    // args.loadingerror.addEventListener('singletap',_retry); //Removed single tap event
    $.RemoteImage.add( args.loadingerror );
  }

	if( onError ){
		onError(error);
	}
}

function _display( file ){

  if( destroyed ) {
    return;
  }

  if( activity ) {
    activity.hide();
  }

	Ti.API.info("In widget.js _display - file ["+ file + "]");

	if( _.isObject(file) && file.exists() ) { //Added a check to see if the file exists. new files aren't saved...
		Ti.API.info("In widget.js _display - In fileExists");

	    $.ImageContainer.image = file.getFile();
		$.ImageContainer.opacity = 1;
	
	    isLoaded = true;
	
		if( onDone ) {
			onDone(this);
		}
	}
	else {
		//Try to load a local image
		if( typeof $.ImageContainer != 'undefined') {
			Ti.API.info("In widget.js _display - In typeof $.ImageContainer != 'undefined'");

			$.ImageContainer.image = file;
			$.ImageContainer.opacity = 1;
		
		    isLoaded = true;
		    
			    if( onDone ) {
				onDone(this);
			}
		}
	}

	Ti.API.info("In widget.js _display - After all finished");

	if(!isLoaded) {
		_error('Unable to find image');
	}
}

function applyProperties(properties) {

  properties = properties || {};

  if( _.has(properties,'onDone') && _.isFunction( properties.onDone ) ){
    onDone = properties.onDone;
    delete args.onDone;
  }

  if( _.has(properties,'onError') && _.isFunction( properties.onError ) ){
    onError = properties.onError;
    delete args.onError;
  }

  var newImage = false;
  if( _.has(properties,'image') && properties.image != args.image ){
    newImage = true;
  }

  args = _.extend(args, properties);

  _applyOuterProperties(args);

  if( args.autoload && args.autoload != "false") {
    load();
    isLoaded = false;
  } else if( !newImage && args.autoload ){
    if( onDone ) {
      _.delay(onDone, 1000);
    }
  }
}

function _applyOuterProperties( properties ) {

  var apply = _.pick(properties,
    'width', 'height',
    'top', 'right', 'bottom', 'left', 'center',
    'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundLeftCap', 'backgroundTopCap', 'backgroundRepeat',
    'borderColor', 'borderWidth', 'borderRadius',
    'opacity', 'visible',
    'bubbleParent', 'zIndex'
  );

  if (_.size(apply)) {
    $.RemoteImage.applyProperties(apply);
  }
}

function getImage() {
  return args.image;

}

function setImage( image ) {
  if(args.image != image && isLoaded == true) {
	  args.image = image;
	    
	  isLoaded = false;
	  load();
  }
}


function getImageURL( url ){
  
  if( !args.gethires ){
		return url;
	}

	var image = url;
  var basename = image.replace(/\\/g,'/').replace( /.*\//, '' );
  var segment = basename.split('.');

  // replace with hires filename
  return image.replace(basename, segment[0]+'@2x.'+segment[1]);

}


function gc(){

  FileLoader.gc();

}


function wipeCache(){

  FileLoader.gc(true);

}


function clean(){

  destroyed = true;

  if( _.has(args,'loadingerror') ){
    args.loadingerror.removeEventListener('singletap',_retry);
  }
  activity.hide();

  $.destroy();

}

Object.defineProperty($, "image", {
	get: getImage,
	set: setImage
});

exports.setImage = setImage;
exports.getImage = getImage;
exports.applyProperties = applyProperties;
exports.load = load;
exports.gc = gc;
exports.wipeCache = wipeCache;
exports.clean = clean;

// EVENTS
exports.on = exports.addEventListener = function(name, callback) {
	return $.RemoteImage.addEventListener(name, callback);
};

exports.off = exports.removeEventListener = function(name, callback) {
	return $.RemoteImage.removeEventListener(name, callback);
};

exports.trigger = exports.fireEvent = function(name, e) {
	return $.RemoteImage.fireEvent(name, e);
};
