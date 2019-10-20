// Module dependencies
import app from '../app';
import http from 'http';
import dotenv from 'dotenv';
import Debug from 'debug';

// Setup env
dotenv.config();

// Setup debug
const debug = Debug('ts-express:server');
debug.enabled = true;

// Normalize a port into a number, string, or false
const normalizePort = (val: number | string): number | string | boolean => {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
};

// Get port from environment and set port
const port = normalizePort(process.env.PORT || 8080);
app.set('port', port);

// Create http server
const server = http.createServer(app);

// Listen on provided port
server.listen(port);

// Add event listener for HTTP server 'error' event
server.on('error', (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Handle spacific listen errors
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Add event listener for HTTP server 'listening' event
server.on('listening', (): void => {
  const addr = server.address();
  let bind: string;
  if (typeof addr === 'string') {
    bind = `Pipe ${addr}`;
  } else if (addr != null) {
    bind = `Port ${addr.port}`;
  } else {
    bind = '';
  }
  debug(`Listening on ${bind}`);
});
