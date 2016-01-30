'use strict';

const io = require('socket.io-client');
const controlSurfaces = {};
let socket;

const attachListeners = (socket) => {
  console.log('connected');
};

const sendEvent = (e) => {
  console.log('sending', e);
  socket.emit('controlSurfaceInput', e);
};

const attachButtonListeners = () => {
  controlSurfaces.brake = document.getElementById('brake');
  controlSurfaces.horn = document.getElementById('horn');
  controlSurfaces.gas = document.getElementById('gas');

  controlSurfaces.horn.addEventListener('click', (e) => sendEvent('horn'));
};

const init = () => {
  console.log('init remote');
  socket = io(window.location.origin);
  socket.on('connection', (socket) => attachListeners);
  attachButtonListeners();
};


module.exports = {
  init: init
};
