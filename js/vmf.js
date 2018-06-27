//https://developer.valvesoftware.com/wiki/VMF_documentation
VMF = function(filename){
    this.filename = filename + ".vmf";
    this.raw_text_data = ""; // The data to save to the vmf file
    this.world_brush_data = [];
}
// Adds a block to the VMF object
VMF.prototype.addBlock = function(x, y, z, width, height, length) {
    b = new Brush(x, y, z, width, height, length);
    this.world_brush_data.push(b);
}
// Creates the VMF file to be loaded in hammer
VMF.prototype.createVmfWorld = function() {
    // Loop through world brushes + 
    var id = 0;

    // Enter generic VMF world data here
    // Now loop through brush, get string and make file.
}