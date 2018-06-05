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
Brush.prototype.getString = function(id) {

    var side = this.getSides(id);
    
    var text =  "solid\n"+
                "{\n"+
                "\t\"id\" \""+id+"\""+
                "\n\t"+side[0]+
                "\n\t"+side[1]+
                "\n\t"+side[2]+
                "\n\t"+side[3]+
                "\n\t"+side[4]+
                "\n\t"+side[5]+
                "\n}";
    return text;
}

Brush.prototype.getSides = function(id) {
    var sides = [];
    // Loop all 6 sides of a box
    for (var i = 0; i < 6; i++) {
        sides.push(this.getSide((id += 1), "TOOLSNODRAW"));
    }

    return sides;
}

// Will need to apply offset based on the side (top, bottom, left, right, front, back)
// Will prob want to multiply the x, y, z to fit in the .VMF world (1 block = 32units)
Brush.prototype.getSide = function(id, material_name) {
    // This is for one side
    var id = "\"id\" \""+id+"\"";
    var plane = "\"plane\" \"("+(this.x)+" "+(this.y)+" "+(this.z)+") ("+(this.x)+" "+(this.y)+" "+(this.z)+") ("+(this.x)+" "+(this.y)+" "+(this.z)+")\"";
    // Will need own directory for custom materials in hammer...
    var mat = "\"material\" \"TOOLS/"+material_name+"\"";
    var uaxis, vaxis;
    var rot = "\"rotation\" \"0\"";
    var lightmapscale = "\"lightmapscale\" \"16\"";
    var smooth = "\"smoothing_groups\" \"0\"";
    var disp = "dispinfo{}";

    var comb = "side {\n\t\t" + id + "\n\t\t" + plane + "\n\t\t" + mat + "\n\t\t" + rot + "\n\t\t" + lightmapscale + "\n\t\t" + smooth + "\n\t\t" + disp + "\n\t}";
    return comb;
}