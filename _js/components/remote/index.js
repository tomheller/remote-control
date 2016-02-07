'use strict';

const io = require('socket.io-client');
const controlSurfaces = {};
let socket;

const attachListeners = () => {
  console.log('connected');
  socket.emit('identify', {
    type: 'remote',
    mappingID: window.mappingID,
  });

  socket.on('mappingDone', () => {
    console.log('mappingDone', 'attaching');
    attachButtonListeners();
  });
};

const sendEvent = (e, v) => {
  socket.emit(e, v);
};

const attachButtonListeners = () => {
  controlSurfaces.brake = document.getElementById('brake');
  controlSurfaces.horn = document.getElementById('horn');
  controlSurfaces.gas = document.getElementById('gas');

  controlSurfaces.horn.addEventListener('touchstart', () => {
    sendEvent('controlSurfaceInput', 'horn_start');
  });
  controlSurfaces.horn.addEventListener('touchend', () => {
    sendEvent('controlSurfaceInput', 'horn_end');
  });
  controlSurfaces.brake.addEventListener('touchstart', () => {
    sendEvent('controlSurfaceInput', 'brake_start');
  });
  controlSurfaces.brake.addEventListener('touchend', () => {
    sendEvent('controlSurfaceInput', 'brake_end');
  });
  controlSurfaces.gas.addEventListener('touchstart', () => {
    sendEvent('controlSurfaceInput', 'gas_start');
  });
  controlSurfaces.gas.addEventListener('touchend', () => {
    sendEvent('controlSurfaceInput', 'gas_end');
  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (evt) => {
      sendEvent('orientationInput', {beta: evt.beta});
    }, true);
  }
};

const initialize = () => {
  console.log('init remote');
  socket = io(window.location.origin);
  socket.on('connect', (soc) => attachListeners(soc));
};


module.exports = {
  init: initialize,
};
