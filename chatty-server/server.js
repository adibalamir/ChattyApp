const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data, ws) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
//future feature
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//sends a message to update the number of users
function clientConnected(client) {
  let onlineUsers = wss.clients.size;
  let connectionMessage = {
    type: "userOnline",
    count: onlineUsers
  }
  if (client.readyState === client.OPEN) {
    console.log(connectionMessage)
    wss.broadcast(JSON.stringify(connectionMessage))
  }
}
//removes number of users when a client disconnects
function clientDisconnected() {
  let onlineUsers = wss.clients.size;
  let connectionMessage = {
    type: "userOffline",
    count: onlineUsers
  }
  console.log(connectionMessage)
  wss.broadcast(JSON.stringify(connectionMessage))
}

wss.on('connection', (ws) => {
  console.log('Client connected')
  clientConnected(ws)
  ws.on('message', function incoming(data) {
    console.log(data);
    wss.broadcast(data, ws);
  });

  ws.on('close', () => {
    clientDisconnected()
    console.log('Client disconnected')
  });
});