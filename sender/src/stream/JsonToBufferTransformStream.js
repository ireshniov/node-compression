"use strict";

const Transform = require('stream').Transform;

class JsonToBufferTransformStream extends Transform {
    _transform(chunk, _encoding, callback) {
        callback(null, Buffer.from(JSON.stringify(chunk)));
    }
}

module.exports = JsonToBufferTransformStream;
