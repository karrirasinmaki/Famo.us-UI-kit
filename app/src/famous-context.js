/*globals define*/
/*
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var logo = new ImageSurface({
        size: [200, 200],
        content: '/content/images/famous_logo.png'
    });

    var logoModifier = new StateModifier({
        origin: [0.5, 0.5]
    });

    mainContext.add(logoModifier).add(logo);
});
*/

define(function(require, exports, module) {
    'use strict';
    
    var Parser = require("parser");
    
    var Engine, ImageSurface, StateModifier;
    
    var win = window;
    var doc = document;
    var body = doc.getElementsByTagName("body")[0];

    var FamousContext = function(containerElement) {
        Engine = require('famous/core/Engine');
        
        var el = doc.createElement("div");
        el.className = "famous-context";
        body.appendChild(el);
        
        var mainContext = Engine.createContext(el);
        
        Parser.parse(containerElement, mainContext);
        containerElement.remove();
    };
    
    module.exports = FamousContext;
    
});