"use strict";

const chai = require('chai');
const ParseAndDelayTransformStream = require("../../src/stream/ParseAndDelayTransformStream");
const JsonToBufferTransformStream = require('../../src/stream/JsonToBufferTransformStream');
const StreamFactory = require('../../src/stream/SensorStreamFactory');

describe('StreamFactory', () => {
    it('#createParseAndDelayTransformStream should return new instance of ParseAndDelayTransformStream', () => {
        chai.expect(StreamFactory.createParseAndDelayTransformStream()).to.be.instanceOf(ParseAndDelayTransformStream);
    });

    it('#createJsonToBufferTransformStream should return new instance of JsonToBufferTransformStream', () => {
        chai.expect(StreamFactory.createJsonToBufferTransformStream()).to.be.instanceOf(JsonToBufferTransformStream);
    });
});
