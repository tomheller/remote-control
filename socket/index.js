const socketio = require('socket.io');
var globalSocket;
var mapping = [];

const getPairing = (socketID) => {
  try {
    var filteredMapping =  mapping.filter((e) => {
      return e.viewer == socketID || e.remote == socketID;
    });
    return filteredMapping[0];
  } catch(e) {
    console.log(e);
  }
}


const attachListeners = (socket) => {
  console.log('connected server');

  socket.on('identify', (i) => {
    mapping[i.mappingID] = mapping[i.mappingID] || {};
    if(i.type == "viewer") {
      console.log('new viewer registered', 'mapping: ', i.mappingID);
      mapping[i.mappingID].viewer = socket.id;
    }
    if(i.type == "remote") {
      console.log('new remote registered', 'mapping: ', i.mappingID);
      mapping[i.mappingID].remote = socket.id;
    }

    if(mapping[i.mappingID].hasOwnProperty('viewer') && mapping[i.mappingID].hasOwnProperty('remote')) {
      console.log('mapping done, sending ping', mapping[i.mappingID]);
    }
  });

  socket.on('controlSurfaceInput', (e) => {
    var pairing = getPairing(socket.id);
    return socket.to(pairing.viewer).emit('doAction', 'aother');
  });

  socket.on('orientationInput', (e) => {
    return console.log(e);
  });
};

const initSocket = (server) => {
  globalSocket = socketio(server);
  globalSocket.on('connection', (socket) => attachListeners(socket));
};

module.exports = server => initSocket(server);
