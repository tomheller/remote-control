'use strict';
let osc;
let ac;
let real;
let imag;

const initialize = () => {
  ac = new AudioContext();
  real = new Float32Array(2);
  imag = new Float32Array(2);
  real[0] = 0;
  imag[0] = 0;
  real[1] = 1;
  imag[1] = 0;
};

const startHorn = () => {
  osc = ac.createOscillator();
  const wave = ac.createPeriodicWave(real, imag, { disableNormalization: true });
  osc.setPeriodicWave(wave);
  osc.connect(ac.destination);
  osc.start(0);
};

const endHorn = () => {
  osc.stop(0);
  osc.disconnect();
};

module.exports = {
  init: initialize,
  start: startHorn,
  end: endHorn,
};
