import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
const ws = require('ws');

// Start the server
const port = Number(process.env.PORT || 5000);

// Setup WebSockets
// const wsServer = new ws.Server({ noServer: true });

// wsServer.on('connection', (socket: any) => {
//   socket.on('message', (message: any) => console.log(message));
// });

// Export server instance
export const server = app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
