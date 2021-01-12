import Server from './Server';

export const server = new Server();

server.start(Number(process.env.PORT) || 5000);
