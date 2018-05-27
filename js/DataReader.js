function DataReader(b) {
    this.bytes = b;
    this.index = 0;
	this.byteRead = 0;
	this.bitIndex = 0;
	this.endian = "big";
}

DataReader.prototype.readByte = function(){
    if (this.eof())
        return;
    var cbyte = this.bytes[this.index]; // Current Byte
    this.index++;
    return cbyte;
}

// Read upto an amount of bytes
DataReader.prototype.readBytes = function(amount) {
    if (this.eof())
        return;
    var cbytes = this.bytes.subarray(this.index, this.index+amount);
    this.index += amount;
    return cbytes;
}

DataReader.prototype.size = function() {
    return this.byte.length;
}

DataReader.prototype.readInteger24 = function(numBytes) {
    if (this.eof())
        return;

    var byteAmount = 3;
    if (numBytes){
        byteAmount = numBytes;
    }

    var byt = 0;
    if (this.endian == "little") {
		var origIndex = this.index;
		for ( var n = this.index + byteAmount - 1; n >= origIndex; n--) {
			byt = ((byt << 8) | this.bytes[n]);
			this.index++;
		}
	} else {
		for ( var n = 0; n < byteAmount; n++) {
			byt = ((byt << 8) | this.bytes[this.index]);
			this.index++;
		}
	}
	return byt;
}

DataReader.prototype.readInteger32 = function(numBytes) {

	if (this.eof())
		return;

	var howMany = 4; // default to a 4-byte integer
	if (numBytes) {
		howMany = numBytes;
	}

	var ret = 0;
	if (this.endian == "little") {
		var origIndex = this.index;
		for ( var n = this.index + howMany - 1; n >= origIndex; n--) {
			ret = ((ret << 8) | this.bytes[n]);
			this.index++;
		}
	} else {
		for ( var n = 0; n < howMany; n++) {
			ret = ((ret << 8) | this.bytes[this.index]);
			this.index++;
		}
	}
	return ret;

}

DataReader.prototype.seek = function(num) {
	this.index = num;
}

DataReader.prototype.eof = function() {
	return (this.index >= this.bytes.length - 1);
}