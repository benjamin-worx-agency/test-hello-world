var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

var notificare = require("ti.notificare");

model = Alloy.M("CallingOfModules", exports.definition, []);

collection = Alloy.C("CallingOfModules", exports.definition, model);

exports.Model = model;

exports.Collection = collection;