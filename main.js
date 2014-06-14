define(function(require, exports, module) {
    'use strict';
    
    require("famous-ui-kit/helpers");
    var FamousContext = require("famous-ui-kit/famous-context");
    
    var win = window;
    var doc = document;
    var body = doc.getElementsByTagName("body")[0];
    
    if (win["fui"] == undefined) win["fui"] = {};
    fui.templates = {}; // for templates
    fui.element = {};   // for ids
    fui.elements = {};  // for classes
    
    if (win.onFamousUILibLoaded) win.onFamousUILibLoaded();
    
    var fillTemplate = function(name) {
        var templates = body.getElementsByTagName("fui-template-" + name);
        for (var i=templates.length-1; i>=0; --i) {
            if (!templates[i]) continue;
            templates[i].outerHTML = fui.templates[name];
        }
    };
    
    var parseTemplates = function() {
        
        var templates = body.getElementsByTagName("fui-template");
        for (var i=templates.length-1; i>=0; --i) {
            var template = templates[i];
            console.log(template);
            var name = fui.attr(template, "name");
            fui.templates[name] = template.innerHTML;
            
            template.remove();
            
            fillTemplate(name);
        }
    };
    
    var fuiParse = function() {
        var timerStart = new Date().getTime();

        parseTemplates();
        
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
