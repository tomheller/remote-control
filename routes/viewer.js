const express = require('express');
const router = express.Router();
const qrcode = require('qrcode-js');
const uuid = require('node-uuid');


router.get('/', (req, res, next) => {
  var random = uuid.v4();
  var url = 'http://192.168.2.106:3000/remote/'+random;
  var base64 = qrcode.toDataURL(url, 4);
  res.render('viewer', {
    qr: base64,
    mappingID: random
  });
});

module.exports = router;
