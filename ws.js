const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const path = require('path');
const fs = require('fs');
const Promise = require("bluebird");

const file = require('./libs/fs');


async function fetchCollections(filePath) {
  const exists = await file.exists(filePath);

  if (exists) {
    let result = await file.readJsonFile(filePath);
    result = JSON.parse(result);
    return result;
  }
}
wss.on('connection', function connection(ws) {
  ws.on('message', async function (message) {
    console.log(message)
    let collection = await fetchCollections('./data/1.json');
    const encodeMsg = message.replace(/\s+/g,"");
    if (Object.prototype.hasOwnProperty.call(collection, encodeMsg)) {
      collection = JSON.stringify(collection);
      ws.send(collection);
    } else {
      const msg = JSON.stringify({
        code: 404,
        data: null,
      })
      ws.send(msg)
    }
  });

  ws.send('something');
});
