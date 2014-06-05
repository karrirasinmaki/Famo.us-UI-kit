/*
Famous imports:
 
<link rel="stylesheet" type="text/css" href="lib/famous/core/famous.css" />

<script type="text/javascript" src="lib/famous-polyfills/functionPrototypeBind.js"></script>
<script type="text/javascript" src="lib/famous-polyfills/classList.js"></script>
<script type="text/javascript" src="lib/famous-polyfills/requestAnimationFrame.js"></script>

<script type="text/javascript" src="src/main.js"></script>

<script type="text/javascript" src="lib/requirejs/require.js" data-main="src/requireConfig"></script>
*/
define(function(require, exports, module) {
    'use strict';
    
    var win = window;
    var doc = document;
    
    /* 
     * Helpers 
     */
    
    /* AJAX */
    var ajax = function(url, method) {
        var callback = {
            success: undefined
        };
        var pub = {
            success: function(fn) {
                callback.success = fn
            }
        };
        
        var xhr;
        // code for IE7+, Firefox, Chrome, Opera, Safari
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        // code for IE6, IE5
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (callback.success) callback.success(xhr.responseText, xhr);
            }
        }
        xhr.open(method, url, true);
        xhr.send();
        
        return pub;
    };
    
    ajax.get = function(url) {
        return ajax(url, "get");
    };
    
    /* Strings */
    var dashToCamelCase = function(str) {
        var parts = str.toLowerCase().split("-");
        for (var i=1, l=parts.length; i<l; ++i) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);
        }
        return parts.join("");
    };
    var dashToUpperCamelCase = function(str) {
        var camelCaseStr = dashToCamelCase(str);
        return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.substr(1);
    };
    
    /* DOM */
    var hasAttr = function(el, attrName) {
        return el.hasAttribute(attrName);
    };
    var attr = function(el, attrName) {
//        if (!hasAttr(el, attrName)) return undefined;
        return el[attrName] || el.getAttribute(attrName);
    };
    
    
    /* ResourceLoader */
    var ResourceLoader = function() {
        this.scripts = [
            "lib/requirejs/require.js",
            "lib/famous-polyfills/functionPrototypeBind.js",
            "lib/famous-polyfills/classList.js",
            "lib/famous-polyfills/requestAnimationFrame.js",
            "lib/famous-ui-kit/main.js"
        ];
        this.css = [
            "lib/famous/core/famous.css",
            "styles/famous-ui.css"
        ];
    };
    
    ResourceLoader.prototype.load = function() {
        var docHead = document.getElementsByTagName("head")[0];
        
        var scriptTemplate = doc.createElement("script");
            scriptTemplate.type = "text/javascript";
        
        // requireConfig
//        var requireConfig = scriptTemplate.cloneNode();
//        requireConfig.src = "lib/requirejs/require.js";
//        requireConfig.dataset.main = "src/requireConfig";
//        docHead.appendChild(requireConfig);
        
        for (var i=0, l=this.scripts.length; i<l; ++i) {
            var el = scriptTemplate.cloneNode();
            el.src = this.scripts[i];
            docHead.appendChild(el);
        }
                                
        var cssTemplate = doc.createElement("link");
            cssTemplate.rel = "stylesheet";
        for (var i=0, l=this.css.length; i<l; ++i) {
            var el = cssTemplate.cloneNode();
            el.href = this.css[i];
            docHead.appendChild(el);
        }
    };
    
    
    /* Main */
    var resLoader = new ResourceLoader();
//    resLoader.load();
    
    
    /* Global exports */
    win["fui"] = {
        dashToCamelCase: dashToCamelCase,
        dashToUpperCamelCase: dashToUpperCamelCase,
        hasAttr: hasAttr,
        attr: attr
    };
    
});