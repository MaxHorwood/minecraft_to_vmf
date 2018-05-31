Brush = function(x, y, z, width, height, length) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = width;
    this.h = height;
    this.l = length;
}

// Converts the brush to a valid 'solid' for the VMF format https://developer.valvesoftware.com/wiki/VMF_documentation:_World_Class#solid
// id needs to be unique
Brush.prototype.toString = function(id) {

   
    var text =  "solid"+
                "{"+
                "\"id\" \""+id+"\""+
                ""+ // all the sides ( 6 total )
                "}"; 
}

Brush.prototype.getSides = function(x, y, z) {
    var sides = [];
    // Loop all 6 sides of a box


    return sides;
}

// Will need to apply offset based on the side (top, bottom, left, right, front, back)
// Will prob want to multiply the x, y, z to fit in the .VMF world (1 block = 32units)
Brush.prototype.getSide = function(side, material_name) {
    // This is for one side
    var id = "\"id\" \""+id+"\"";
    var plane = "\"plane\" \"("+(this.x)+" "+(y)+" "+(z)+")\" \"("+(x)+" "+(y)+" "+(z)+")\" \"("+(x)+" "+(y)+" "+(z)+")\" ";
    var mat = "\"material\" \"MINECRAFT/"+material_name+"\"";
    var uaxis, vaxis;
    var rot = "\"rotation\" \"0\"";
    var lightmapscale = "\"lightmapscale\" \"16\"";
    var smooth = "\"smoothing_groups\" \"0\"";
    var disp = "dispinfo{}";

    var comb = "side {" + id + "\n" + plane + "\n" + mat + "\n" + rot + "\n" + lightmapscale + "\n" + smooth + "\n" + disp + "\n }";
    return comb;
}