'use strict';

const io = require('socket.io-client');
const horn = require('./horn.js');
let socket;


const attachListeners = () => {
  console.log('attach viewer');

  socket.emit('identify', {
    type: 'viewer',
    mappingID: 1
  });

  socket.on('doAction', (a) => {
    switch (a) {
      case 'horn_start':
        horn.start();
        break;
      case 'horn_end':
        horn.end();
        break
      default:

    }
  });
};

const init = () => {
  console.log('init viewer');
  socket = io(window.location.origin);
  socket.on('connect', (e) => attachListeners());
  //init horn
  horn.init();
};


module.exports = {
  init: init
};
