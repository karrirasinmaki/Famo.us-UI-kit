define(function(require, exports, module) {
    
    var GridLayout = require("famous/views/GridLayout");
    
    var Grid = function() {
        GridLayout.apply(this, arguments);
        
        this.surfaces = [];
        this.sequenceFrom(this.surfaces);
        
        this.fixedDimensions = this.options.dimensions;
    };
    
    Grid.prototype = Object.create(GridLayout.prototype);
    
    Grid.prototype.add = function(el) {        
        this.surfaces.push(el);
        if (this.fixedDimensions[1] == "undefined") {
            var dx = this.fixedDimensions[0];
            this.setOptions({
                dimensions: [dx, Math.round(this.surfaces.length/dx)]
            });
        }
        else if (this.fixedDimensions[0] == "undefined") {
            var dy = this.fixedDimensions[1];
            this.setOptions({
                dimensions: [Math.round(this.surfaces.length/dy), dy]
            });
        }
    };
    
    module.exports = Grid;
});
