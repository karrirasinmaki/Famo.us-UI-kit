define(function(require, exports, module) {
    
    var FamScrollview = require("famous/views/Scrollview");
    
    var Scrollview = function() {
        FamScrollview.apply(this, arguments);
        
        this.direction = this.options.direction;
        
        this.surfaces = [];
        this.sequenceFrom(this.surfaces);
        
        this.addSizeUpdater();
    };
    
    Scrollview.prototype = Object.create(FamScrollview.prototype);
    
    Scrollview.prototype.add = function(el) {
        el.pipe(this);
        this.surfaces.push(el);
    };
    
    Scrollview.prototype.addSizeUpdater = function() {
        var _this = this;
        
        var heightUpdater = function() {
            for (var i=0, l=_this.surfaces.length; i<l; ++i) {
                var surface = _this.surfaces[i];
                var surfaceSize = surface.getSize();
                var surfaceW = surfaceSize[0];
                var surfaceH = surfaceSize[1];
                
                if (_this.direction == 0) {
                    var sizeW = surface._currTarget.offsetWidth;

                    if (surfaceW != null && sizeW < surfaceW) sizeW = surfaceW;
                    surface.setOptions({
                        size: [sizeW, surfaceH]
                    });

                    _this.sync.removeListener('start', heightUpdater);
                }
                else {
                    var sizeH = surface._currTarget.offsetHeight;

                    if (surfaceH != null && sizeH < surfaceH) sizeH = surfaceH;
                    surface.setOptions({
                        size: [surfaceW, sizeH]
                    });

                    _this.sync.removeListener('start', heightUpdater);
                }
            };
        };
        
        this.sync.on('start', heightUpdater);
    }
    
    module.exports = Scrollview;
});