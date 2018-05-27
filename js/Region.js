// 
Region = function(file) {
    // var r_ = new RegExp("\\br.(-{0,1}\\d+).(-{0,1}\\d+).mca+\\b");
    var r_ = new RegExp("r.(\\d+).(\\d+).mca");
    r = r_.exec(file.name); // Getting the x and z position based on the file name
    this.location = {
        x: parseInt(r[1]),
        z: parseInt(r[2])
    }
    this.loaded = false;
    this.file = file;
    this.chunkOffset = null;
    this.rawChunkData = null;
    this.chunks = {};
    this.callbacks = {};
}

Region.prototype.load = function(callback) {
    if (!this.loaded) {
        var file_reader = new FileReader();

        self = this;

        // Load all the chunks
        file_reader.onload = function(event){
            var binChunkData = event.target.result; // the raw data...
            self.chunkOffset = new Uint32Array(binChunkData, 0, 1024); // Split up by 1024
            self.rawChunkData = new Uint8Array(binChunkData, 8192); // Chunk data is 8192 bytes
            self.loaded = true;
            
            // The region file can only have a maximum of 32x32 chunks
            for (var x = 0; x < 32; x++){
                for (var y = 0; y < 32; y++){
                    var chunk = self.getChunk(x,y);
                    if (chunk !== null && chunk !== undefined){
                        chunk.load();
                    }
                }
            }

            if(callback){
                callback.call(this);
            }
        };
        // Log out error
        file_reader.onerror = function(event){
            console.log("Failed to open Region file.");
            console.log(event);
        }
        // Read as array buffer (onload)
        file_reader.readAsArrayBuffer(this.file);
    }
}

Region.prototype.getChunk = function(x, z){
    if (this.loaded) {
        if ((x < 0 || x >= 32) || 
            (z < 0 || z >= 32)){
            return null;
        }
        // Already have chunk
        if (this.chunks[[x, z]] !== undefined){
            return this.chunks[[x, z]];
        }
        // Make datareader...
        var reader = new DataReader(this.rawChunkData);
        var num = this.chunkOffset[x + z * 32];
        var offset = (
            ( num >> 24) & 0xFF ) | (
            ( num << 8) & 0xFF0000 ) | (
            ( num >> 8) & 0xFF00 ) | (
            ( num << 24) & 0xFF000000);
        
        var sectorNumber = (offset >> 8) & 0xFFFFFF;
        var numSectors = offset & 0xFF;

        //console.log("Sector Num: "+sectorNumber+"\nNum Sectors: "+numSectors+"\nOffset: "+offset);

        // Nothing
        if (sectorNumber === 0 && numSectors === 0) {
            this.chunks[[x,z]] = null;
            return null;
        }

        reader.seek((sectorNumber - 2) * 4096);

        var len = reader.readInteger32();
        var compressionType = reader.readByte();
        if (compressionType === 1) {
            // GZIP
            alert("gzip is not supported");
            this.chunks[[x,z]] = null;
            return null;
        }else if (compressionType === 2){
            // We use Zlib
            reader.readByte();
            reader.readByte();
            var compressedChunkData = reader.readBytes(len - 5);

            var inflated = new Array();
            var isErr = puff(inflated, compressedChunkData);

            if (isErr != 0) {
                console.log("Error Puffing " + isErr);
                this.chunks[[x,z]] = null;
                return null;
            }

            inflated = new Uint8Array(inflated);

            this.chunks[[x,z]] = new Chunk(inflated, x, z);
            //console.log(this.chunks[[x,z]]);
            return this.chunks[[x,z]];

        }

        return null;

    }
}