"use strict";

process.on('SIGTERM', function() {
    process.exit(0);
});

const WebSocket = require('ws');
const SensorStreamFactory = require("./stream/SensorStreamFactory");
const split = require('split');

const connection = new WebSocket('ws://127.0.0.1:8080');
const webSocketStream = WebSocket.createWebSocketStream(connection, { encoding: 'utf8' });

process.stdin
    .pipe(split())
    .pipe(SensorStreamFactory.createParseAndDelayTransformStream())
    .pipe(SensorStreamFactory.createJsonToBufferTransformStream())
    .pipe(webSocketStream)
    .on('error', console.error)
    .on('finish', () => console.log('End of stream'));
