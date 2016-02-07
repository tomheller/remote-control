const express = require('express');
const router = express.Router();

router.get('/:uuid', (req, res, next) => {
  res.render('remote', {
    mappingID: req.params.uuid
  });
});


module.exports = router;
