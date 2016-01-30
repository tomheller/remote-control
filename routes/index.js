const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Remote control ' });
});

router.use('/remote', require('./remote.js'));
router.use('/viewer', require('./viewer.js'));

module.exports = router;
