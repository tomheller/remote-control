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
    alert(a);
  });
};

const init = () => {
  console.log('init viewer');
  socket = io(window.location.origin);
  socket.on('connect', (e) => attachListeners());
};


module.exports = {
  init: init
};
