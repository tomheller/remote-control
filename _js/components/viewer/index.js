'use strict';

const io = require('socket.io-client');
const horn = require('./horn.js');
const scene = require('./scene.js');
const timers = {};
let socket;

let speedUpCounter;
const speedUp = () => {
  speedUpCounter++;
  scene.ctrlObj().velocity = Math.min(1, Math.max(0, scene.ctrlObj().velocity + 0.01));
};

let slowDownCounter;
let breakVector = 0.02;
const slowDown = () => {
  slowDownCounter++;
  scene.ctrlObj().velocity = Math.max(0, Math.min(scene.ctrlObj().velocity - breakVector, 1));
  if(scene.ctrlObj().velocity === 0) {
    clearInterval(timers.slow);
  }
}

const attachListeners = () => {
  console.log('attach viewer');
  socket.emit('identify', {
    type: 'viewer',
    mappingID: 1,
  });

  socket.on('doAction', (a) => {
    switch (a) {
      case 'horn_start':
        horn.start();
        break;
      case 'horn_end':
        horn.end();
        break;
      case 'gas_start':
        console.log('gas start');
        speedUpCounter = 0;
        timers.gas = setInterval(speedUp, 1000 / 30);
        break;
      case 'gas_end':
        console.log('gas end');
        slowDownCounter = 0;
        clearInterval(timers.gas);
        timers.slow = setInterval(slowDown, 1000 / 30);
        break;
      case 'break_start':
        console.log('break start');
        breakVector = 0.3;
        break;
      case 'break_end':
        console.log('break end');
        breakVector = 0.02;
        break;
      default:
    }
  });

  socket.on('orientationInput', (a) => {
    let turn = a.beta;
    if(scene.ctrlObj()) {
      scene.ctrlObj().turn = (Math.PI / 180) * -(turn * 0.02);
    }
  });
};

const initialize = () => {
  console.log('init viewer');
  socket = io(window.location.origin);
  socket.on('connect', () => attachListeners());
  horn.init();

  scene.init();
  scene.load('/obj/rccar.obj');
  scene.animate();
};


module.exports = {
  init: initialize,
};
