"use strict";

const Transform = require('stream').Transform;

class ParseAndDelayTransformStream extends Transform {
    _transform(chunk, _encoding, callback) {
        if(chunk === '') return callback();

        let parsed = chunk;

        try {
            parsed = JSON.parse(chunk);
        } catch (e) {
            return callback(new Error(`Can't parse: ${chunk}. ${e}`));
        }

        // set the a delay between 0 and 2000 ms
        const delay = Math.round(Math.random() * 2000)
        setTimeout((() => callback(null, parsed)), delay)
    }
}

module.exports = ParseAndDelayTransformStream;
