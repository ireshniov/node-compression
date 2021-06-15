"use strict";

const JsonToBufferTransformStream = require("./JsonToBufferTransformStream");
const ParseAndDelayTransformStream = require("./ParseAndDelayTransformStream");

class SensorStreamFactory {
    static createJsonToBufferTransformStream(options = { objectMode: true }) {
        return new JsonToBufferTransformStream(options);
    }

    static createParseAndDelayTransformStream(options = { objectMode: true }) {
        return new ParseAndDelayTransformStream(options);
    }
}

module.exports = SensorStreamFactory;
