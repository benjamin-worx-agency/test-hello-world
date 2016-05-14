
exports.baseController = "tikkGallery";

var numberOfItems = 15;
var categoryUrlParams = { "parameters[type]":"category", "sort": "title", "direction":"ASC", "pagesize": numberOfItems, "parameters[status]": 1}; //default value for the gallery

var categoriesArray = [];
Ti.App.fireEvent('loading');		
$.Categories.fetch({
	"success": function(e) {
		//Ti.API.info("Success fetching categories" + JSON.stringify(e));
		for(i in e.models) {
			var model = e.models[i];
			
			model.title = model.get('title');
			if(model.get('local_image') != null) {
				model.image = model.get('local_image');	
			} else {
				model.image = "";
			}
			
			categoriesArray.push(e.models[i]);
		}
		
		$.grid.createGrid({
		    columns:3,              //NUMBER OF COLUMNS. DEFAULT IS 4.
		    space: 0,               //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
		    data: categoriesArray,             //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
		    layout:'gallery',               //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
		    params:{
		        padding: 0,          //GALLERY ONLY.
		        showTitle: false,        //GALLERY ONLY. True or False
		        backgroundColor: '#eee',
		        alternateBackgroundColor: '#eee',
		        gridColor: '#ccc'
		    }
		});
	},
	"error": function(responseJSON, responseText) {
		Ti.App.fireEvent('triggerError', {"message": responseText});
	}, "urlparams": categoryUrlParams
});

/**
 * Transforms the category and set all UI fields
 */
categoryTransform = function(model) {
	Ti.API.info("In gallery category transform: " + JSON.stringify(model));
	// Need to convert the model to a JSON object
    var transform = model.toJSON();
    
    return transform;
};