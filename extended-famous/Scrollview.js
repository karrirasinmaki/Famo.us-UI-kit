define(function(require, exports, module) {
    
    var FamScrollview = require("famous/views/Scrollview");
    
    var Scrollview = function() {
        FamScrollview.apply(this, arguments);
        
        this.direction = this.options.direction;
        
        this.surfaces = [];
        this.sequenceFrom(this.surfaces);
    };
    
    Scrollview.prototype = Object.create(FamScrollview.prototype);
    
    Scrollview.prototype.add = function(el) {
        el.pipe(this);
        this.surfaces.push(el);
        
        el.getSize = function() {
            var target = el._currTarget;
            if (target) {
                return [target.offsetWidth, target.offsetHeight];
            }
        };
    };
    
    module.exports = Scrollview;
});