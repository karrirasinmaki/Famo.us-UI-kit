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
    
    var Engine, ImageSurface, Surface, ContainerSurface, StateModifier, Modifier;
    
    var hasAttr = fui.hasAttr;
    var win = window;
    var doc = document;

    var Parser = {};
    
    Parser.extendedDependencies = {};
    
    win.fui.addElement = function(tagName, famElClass) {
        Parser.extendedDependencies[tagName] = famElClass;
        console.log(Parser);
    };
    
    var getParentSize = function(parent) {
        var size;
        if (parent != undefined) {
            if (parent.getSize) size = parent.getSize();
        }
        if (size == undefined) {
            size = [win.innerHeight, win.innerWidth];
        }
        
        return size;
    };
    
    var attr = function(el, attrName) {
        var a = fui.attr(el, attrName);
        switch (a) {
            case "MATCH_PARENT":
                return "undefined";
            case "WRAP_CONTENT":
                return "true";
            default:
                return a;
        }
    };
    
    var arrAttr = function(el, a1, a2) {
        var arr = [attr(el, a1), attr(el, a2)];
        if (!arr[0] || !arr[1]) return false;
        else return arr;
    };
    
    var evalArrAttr = function(el, a1, a2) {
        var arr = arrAttr(el, a1, a2);
        if (!arr) return arr;
        else return [eval(arr[0]), eval(arr[1])];
    };
    
    var originArrAttr = function(el, parent, size) {
        var arr = arrAttr(el, "origin-x", "origin-y");
        if (!arr) {
            arr = arrAttr(el, "left", "top");
            if (!arr) return arr;
            
            var parentSize = getParentSize(parent);
            
            if (arr[0] != 0) arr[0] = arr[0] / (parentSize[0] - size[0]);
            if (arr[1] != 0) arr[1] = arr[1] / (parentSize[1] - size[1]);
        }
        console.log(arr);
        return arr;        
    };
    
    var sizeArrAttr = function(el, parent) {
        var arr = arrAttr(el, "width", "height");
        if (!arr) return arr;
        else {
            var size = getParentSize(parent);
            
            var ws = arr[0].replace(/%/g, "*" + size[0]/100);
            var hs = arr[1].replace(/%/g, "*" + size[1]/100);
            console.log(ws, hs, size);
            return [eval(ws), eval(hs)];
        }
    };
    
    Parser.containerTags = {
        "container": true,
        "container-surface": true,
        "scrollview": true,
        "header-footer-layout": true,
        "grid": true
    };
    
    Parser.getDependency = function(name) {
        if (this[name] != undefined) {
            return;
        }
        
        this[name] = (function() {
            switch (name) {
                case "Container":
                case "ContainerSurface":
                    return require("famous/surfaces/ContainerSurface");
                case "Scrollview":
                    return require("famous-ui-kit/extended-famous/Scrollview");
                case "ImageSurface":
                    return require("famous/surfaces/ImageSurface");
                case "Surface":
                    return require("famous/core/Surface");
                case "Modifier":
                    return require("famous/core/Modifier");
                case "Grid":
                    return require("famous-ui-kit/extended-famous/Grid");
                default:
                    return Parser.extendedDependencies[name];
            }
        })();
    };
    
    Parser.addFamElToElementLists = function(htmlEl, famEl) {
        if (htmlEl.id) fui.element[htmlEl.id] = famEl;
        if (htmlEl.className) {
            for (var i=0, l=htmlEl.classList.length; i<l; ++i) {
                var className = htmlEl.classList[i];
                if (!fui.elements[className]) fui.elements[className] = [];
                fui.elements[className].push(famEl);
            }
        }
    };
    
    Parser.parse = function(htmlContainer, famousContainer, grandParent) {
        var children = htmlContainer.children;
        
        for (var i=0, l=children.length; i<l; ++i) {
            var parent = grandParent || famousContainer;
            var child = children[i];
            var famEl = Parser.convertToFamousElement(child, parent);
            
            if (famEl == undefined) {
                child.remove();
                continue;
            }
            
            Parser.addFamElToElementLists(child, famEl);
            
            if (parent != undefined) parent = parent.add(famEl);
            else famousContainer.add(famEl);
            
            if (Parser.containerTags[child.tagName.toLowerCase()]) {
                parent = famEl;
            }
            
            Parser.parse(child, famEl, parent);
        }
    };
    
    Parser.ctfu = Parser.convertToFamousUnits = function(value) {
        
    };
    
    Parser.convertToFamousElement = function(el, parent) {
        var objectName = fui.dashToUpperCamelCase(el.tagName);
        
        var size = sizeArrAttr(el, parent);
        var origin = originArrAttr(el, parent, size);
        var dimensions = arrAttr(el, "cols", "rows");
        var direction = attr(el, "direction");
        var classes = attr(el, "class");
        var content = attr(el, "src") || el.innerHTML;
        var properties = attr(el, "properties");
        
        Parser.getDependency(objectName);
        
        var options = {};
        if (size) options.size = size;
        if (origin) options.origin = origin;
        if (dimensions) options.dimensions = dimensions;
        
        if (direction) options.direction = parseInt(direction);
        
        if (content) options.content = content
        if (classes) options.classes = classes.split(" ");
        
        if (properties) {
            var out = {};
            var rows = properties.split(";");
            for (var i=0, l=rows.length; i<l; ++i) {
                var cols = rows[i].split(":");
                out[cols[0]] = cols[1];
            }
            
            properties = out;
            options.properties = properties;
        }
        console.log(this);
        var famEl = new this[objectName](options);
        famEl.dataset = el.dataset;
        return famEl;
    };
    
    module.exports = Parser;
    
});
