const express = require('express');
const router = express.Router();
const qrcode = require('qrcode-js');
function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

var idCounter = 0;

const getID = () => {
  if(idCounter > 100) {
    idCounter = 0;
  }
  idCounter++;
  return idCounter;
}

router.get('/', (req, res, next) => {
  var id = getID();
  var url = 'http://'+req.headers.host+'/remote/'+id;
  var base64 = qrcode.toDataURL(url, 4);
  res.render('viewer', {
    qr: base64,
    mappingID: id
  });
});

module.exports = router;
