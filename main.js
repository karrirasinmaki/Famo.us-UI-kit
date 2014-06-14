define(function(require, exports, module) {
    'use strict';
    
    require("famous-ui-kit/helpers");
    var FamousContext = require("famous-ui-kit/famous-context");
    
    var win = window;
    var doc = document;
    var body = doc.getElementsByTagName("body")[0];
    
    if (win["fui"] == undefined) win["fui"] = {};
    fui.element = {};  // for ids
    fui.elements = {}; // for classes
    
    if (win.onFamousUILibLoaded) win.onFamousUILibLoaded();
    
    var fuiParse = function() {
        var timerStart = new Date().getTime();

        var contexts = body.getElementsByTagName("famous-context");
        for (var i=0, l=contexts.length; i<l; ++i) {
            new FamousContext(contexts[i]);
        }

        var timerEnd = new Date().getTime();
        console.log("Parsed in " + (timerEnd - timerStart) + "ms");

        if (win.onUIReady) win.onUIReady();
    }
    
    module.exports = fuiParse;
    win["fuiParse"] = fuiParse;
    
});
