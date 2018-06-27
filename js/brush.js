Brush = function(x, y, z, width, height, length) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = width;
    this.h = height;
    this.l = length;
    // Use nodraw as defualt.
    this.material_name = "TOOLS/TOOLSNODRAW";
    // Add the material names. Append the directory (minecraft) later.
    this.material_name_sides= ["", "", "", "", "", ""];
}

Brush.prototype.setMaterial = function(name) {
    this.material_name = name;
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
        sides.push( this.getSide( (id += 1), i));
    }

    return sides;
}

// Will need to apply offset based on the side (top, bottom, left, right, front, back)
// Will prob want to multiply the x, y, z to fit in the .VMF world (1 block = 32units)
Brush.prototype.getSide = function(id, side) {
    // This is for one side
    var idt = "\"id\" \""+id+"\"";
    var x1, x2, x3, z1, z2, z3, y1, y2, y3;
    
    var width = this.w * this.x;
    var height = this.h * this.y;
    var len = this.l * this.z;

    y1 = height;
    y2 = height;
    y3 = height;
    z1 = len;
    z2 = len;
    z3 = len;
    x1 = width;
    x2 = width;
    x3 = width;
    var uaxis, vaxis;
    switch(side) {
        case 0: // top
            y1 = height+this.h;
            y2 = height+this.h;
            y3 = height+this.h;
            
            z2 = len+this.l;
            z3 = len+this.l;

            x3 = width+this.w;
            uaxis = "\"uaxis\" \"[1 0 0 0] 0.25\"";
            vaxis = "\"vaxis\" \"[0 -1 0 0] 0.25\"";
            break;
        case 1: // bot
            z1 = len+this.l;

            x3 = width+this.w;
            uaxis = "\"uaxis\" \"[1 0 0 0] 0.25\"";
            vaxis = "\"vaxis\" \"[0 -1 0 0] 0.25\"";
            break;
        case 2:
            y3 = height+this.h;
            z2 = len+this.l;
            z3 = len+this.l;
            uaxis = "\"uaxis\" \"[0 1 0 0] 0.25\"";
            vaxis = "\"vaxis\" \"[0 0 -1 0] 0.25\"";
            break;
        case 3: // Front
            y3 = height+this.h;
            x1 = width+this.w;
            x2 = width+this.w;
            x3 = width+this.w;
            z1 = len+this.l;
            uaxis = "\"uaxis\" \"[0 1 0 0] 0.25\"";
            vaxis = "\"vaxis\" \"[0 0 -1 0] 0.25\"";
            break;
        case 4:
            y3 = height+this.h;
            x2 = width+this.w;
            x3 = width+this.w;
            z1 = len+this.l;
            z2 = len+this.l;
            z3 = len+this.l;
            uaxis = "\"uaxis\" \"[1 0 0 0] 0.25\"";
            vaxis = "\"vaxis\" \"[0 0 -1 0] 0.25\"";
            break;
        case 5:
            y3 = height+this.h;
            x1 = width+this.w;
            uaxis = "\"uaxis\" \"[1 0 0 0] 0.25\"";
            vaxis = "\"vaxis\" \"[0 0 -1 0] 0.25\"";
            break;
    }
    var plane = "\"plane\" \"("+(x1)+" "+(z1)+" "+(y1)+") ("+(x2)+" "+(z2)+" "+(y2)+") ("+(x3)+" "+(z3)+" "+(y3)+")\"";
    // Will need own directory for custom materials in hammer...
    // Defualt nodraw
    var mat = "\"material\" \""+this.material_name+"\"";
    if (this.material_name_sides[x] != ""){
        mat = "\"material\" \"MINECRAFT\\"+this.material_name_sides[x]+"\"";
    }
    

    var rot = "\"rotation\" \"0\"";
    var lightmapscale = "\"lightmapscale\" \"16\"";
    var smooth = "\"smoothing_groups\" \"0\"";
    //var disp = "dispinfo{}";

    var comb = "side\n\t{\n\t\t" + idt + "\n\t\t" + plane + "\n\t\t" + mat + "\n\t\t" + uaxis + "\n\t\t"+ vaxis  + "\n\t\t" + rot + "\n\t\t" + lightmapscale + "\n\t\t" + smooth + "\n\t}";
    return comb;
}