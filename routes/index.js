const express = require('express');
const router = express.Router();

router.use('/remote', require('./remote.js'));
router.use('/', require('./viewer.js'));

module.exports = router;
