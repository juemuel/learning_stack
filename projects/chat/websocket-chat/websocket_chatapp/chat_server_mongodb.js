const express = require('express')
const http = require('http');
const WebSocket  = require('ws');

const port = 6969;
const app = express();
const server = http.createServer(app);
// 传入必须{}对象形式
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }); 
});

server.listen(port, function(){
    console.log('listening on *:' + port);
} )
