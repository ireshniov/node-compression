"use strict";

process.on('SIGTERM', function() {
    process.exit(0);
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 8080,
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message.toString());
    });
});
