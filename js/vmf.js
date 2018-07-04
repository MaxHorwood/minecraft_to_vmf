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
VMF.prototype.createVmfWorld = function(raw_block_data) {
    // Loop through world brushes + add blocks
    var id = 0;

    for (var i = 0; i < raw_block_data.length; i++) {
        this.addBlock(raw_block_data[i].x);
    }

    // Now loop through brush, get string and make file.
    for (var x = 0; x < this.world_brush_data.length; x++) {
        var current_string = this.world_brush_data[x].getString(id);
        // Append to file template.
    }
}