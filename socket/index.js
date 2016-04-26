const socketio = require('socket.io');
var globalSocket;
var mapping = [];

const log = () => {
  if (process.env.NODE_ENV === "production") {
    return () => {};
  } else {
    return (string) => {
      console.log(string);
    }
  }
}();


const getPairing = (socketID) => {
  try {
    log(mapping);
    var filteredMapping = mapping.filter((e) => {
      return (e.viewer == socketID || e.remote == socketID);
    });
    return filteredMapping[0];
  } catch(e) {
    log(e);
  }
};

const attachListeners = (socket) => {
  log('connected server');

  socket.on('identify', (i) => {
    id = i.mappingID.split('-').join('');
    mapping[id] = mapping[id] || {};
    if(i.type == "viewer") {
      log('new viewer registered', 'mapping: ', id);
      mapping[id].viewer = socket.id;
    }
    if(i.type == "remote") {
      log('new remote registered', 'mapping: ', id);
      mapping[id].remote = socket.id;
    }

    if(mapping[id].hasOwnProperty('viewer') && mapping[id].hasOwnProperty('remote')) {
      log('mapping done, sending init ping',id, mapping[id]);
      socket.to(mapping[id].viewer).emit('mappingDone');
      socket.emit('mappingDone');
    }
  });

  socket.on('controlSurfaceInput', (e) => {
    var pairing = getPairing(socket.id);
    log(e);
    return socket.to(pairing.viewer).emit('doAction', e);
  });

  socket.on('orientationInput', (e) => {
    var pairing = getPairing(socket.id);
    log(e);
    return socket.to(pairing.viewer).emit('orientationInput', e);
  });

  socket.on('error', (e) => {
    log(e);
  });
};

const initSocket = (server) => {
  globalSocket = socketio(server);
  globalSocket.on('connection', (socket) => attachListeners(socket));
};

module.exports = server => initSocket(server);
