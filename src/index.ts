import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { Request, Response } from 'express';
import { connect } from 'mongodb';

// Start the server
const port = Number(process.env.PORT || 5000);

// Export server instance
export const server = app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});

// Setup WebSockets
const webSocketServer = require('websocket').server;

const wsServer = new webSocketServer({
  httpServer: server,
});

function originIsAllowed(origin: string) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

const clients: any = {};

wsServer.on('request', function (request: any) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(
      new Date() + ' Connection from origin ' + request.origin + ' rejected.'
    );
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(new Date() + ' Connection accepted.');

  connection.on('message', function (message: any) {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data);

      clients[data.user_id] = connection;

      switch (data.type) {
        default:
          connection.sendUTF(message.utf8Data);
      }
    }
  });

  connection.on('close', function (message: any) {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data);

      delete clients[data.user_id];
    }

    console.log(
      new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.'
    );
  });
});
