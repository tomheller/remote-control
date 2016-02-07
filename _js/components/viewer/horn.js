'use strict';
let oscNode;
let ac;
let real;
let imag;
let gainNode;

const initialize = () => {
  ac = new AudioContext();
  real = new Float32Array(2);
  imag = new Float32Array(2);
  real[0] = 0;
  real[1] = 1;
  imag[0] = 0;
  imag[1] = 1;
};

const startHorn = () => {
  console.log('start horn');
  oscNode = ac.createOscillator();
  const wave = ac.createPeriodicWave(real, imag, { disableNormalization: true });
  //oscNode.setPeriodicWave(wave);
  oscNode.type = 'sine';
  oscNode.frequency.value = 280;

  gainNode = ac.createGain();
  oscNode.connect(gainNode);
  gainNode.connect(ac.destination);
  oscNode.start(0);
  gainNode.gain.value = 0.0;
  gainNode.gain.linearRampToValueAtTime(0.0, ac.currentTime);
  gainNode.gain.linearRampToValueAtTime(1.0, ac.currentTime + 0.4);
};

const endHorn = () => {
  gainNode.gain.linearRampToValueAtTime(1.0, ac.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.0, ac.currentTime + 0.2);
  oscNode.stop(ac.currentTime + 0.2);
  oscNode.onended = () => {
    oscNode.disconnect();
    gainNode.disconnect();
  };
};

module.exports = {
  init: initialize,
  start: startHorn,
  end: endHorn,
};
