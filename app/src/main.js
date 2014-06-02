define(function(require, exports, module) {
    'use strict';
    
    var FamousContext = require("famous-context");
    
    var win = window;
    var doc = document;
    var body = doc.getElementsByTagName("body")[0];
    
    if (win["fui"] == undefined) win["fui"] = {};
    fui.elements = {};
    
    var timerStart = new Date().getTime();
    
    var contexts = body.getElementsByTagName("famous-context");
    for (var i=0, l=contexts.length; i<l; ++i) {
        new FamousContext(contexts[i]);
    }
    
    var timerEnd = new Date().getTime();
    console.log("Parsed in " + (timerEnd - timerStart) + "ms");
});
