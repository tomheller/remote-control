'use strict';

const io = require('socket.io-client');
//const debounce = require('../utils/debounce.js');
const controlSurfaces = {};
let socket;

const attachListeners = () => {
  console.log('connected');
  socket.emit('identify', {
    type: 'remote',
    mappingID: 1
  });
};

const sendEvent = (e, v) => {
  console.log('sending', e);
  socket.emit(e, v);
};

const attachButtonListeners = () => {
  controlSurfaces.brake = document.getElementById('brake');
  controlSurfaces.horn = document.getElementById('horn');
  controlSurfaces.gas = document.getElementById('gas');

  controlSurfaces.horn.addEventListener('touchstart', (e) => sendEvent('controlSurfaceInput', 'horn_start'));
  controlSurfaces.horn.addEventListener('touchend', (e) => sendEvent('controlSurfaceInput', 'horn_end'));
  controlSurfaces.brake.addEventListener('touchstart', (e) => sendEvent('controlSurfaceInput', 'brake_start'));
  controlSurfaces.brake.addEventListener('touchend', (e) => sendEvent('controlSurfaceInput', 'brake_end'));
  controlSurfaces.gas.addEventListener('touchstart', (e) => sendEvent('controlSurfaceInput', 'gas_start'));
  controlSurfaces.gas.addEventListener('touchend', (e) => sendEvent('controlSurfaceInput', 'gas_end'));

  // if (window.DeviceOrientationEvent) {
  //   window.addEventListener("deviceorientation", (evt) => {
  //       sendEvent('orientationInput', {beta: evt.beta});
  //   }, true);
  // }
};

const init = () => {
  console.log('init remote');
  socket = io(window.location.origin);
  socket.on('connect', (socket) => attachListeners(socket));
  attachButtonListeners();
};


module.exports = {
  init: init
};
