"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Module dependencies
const app_1 = __importDefault(require("../app"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const debug_1 = __importDefault(require("debug"));
// Setup env
dotenv_1.default.config();
// Setup debug
const debug = debug_1.default('ts-express:server');
debug.enabled = true;
// Normalize a port into a number, string, or false
const normalizePort = (val) => {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
};
// Get port from environment and set port
const port = normalizePort(process.env.PORT || 8080);
app_1.default.set('port', port);
// Create http server
const server = http_1.default.createServer(app_1.default);
// Listen on provided port
server.listen(port);
// Add event listener for HTTP server 'error' event
server.on('error', (error) => {
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
server.on('listening', () => {
    const addr = server.address();
    let bind;
    if (typeof addr === 'string') {
        bind = `Pipe ${addr}`;
    }
    else if (addr != null) {
        bind = `Port ${addr.port}`;
    }
    else {
        bind = '';
    }
    debug(`Listening on ${bind}`);
});
