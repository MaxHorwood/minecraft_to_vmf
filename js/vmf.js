VMF = function(filename){
    this.filename = filename + ".vmf";
    this.raw_text_data = ""; // The data to save to the vmf file
    this.world_brush_data = [];
}

VMF.prototype.addBlock = function(x, y, z, width, height, length) {
    b = new Brush(x, y, z, width, height, length);
    this.world_brush_data.push(b);
}