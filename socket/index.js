const socketio = require('socket.io');
var socket;

const attachListeners = (socket) => {
  console.log('connected server')
  socket.on('controlSurfaceInput', (e) => {
    return console.log(e);
  });
};

const initSocket = (server) => {
  console.log('init socket');
  socket = socketio(server);

  return socket.on('connection', socket => attachListeners);
};

module.exports = server => initSocket(server);
