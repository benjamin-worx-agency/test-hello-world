var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

var properties = {};

model = Alloy.M("App", exports.definition, []);

collection = Alloy.C("App", exports.definition, model);

exports.Model = model;

exports.Collection = collection;