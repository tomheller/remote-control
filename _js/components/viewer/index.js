const io = require('socket.io-client');
const socket = io(window.location.origin);



module.exports = {
  init: init
};
