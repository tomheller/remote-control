const express = require('express');
const router = express.Router();

router.get('/:mappingid', (req, res, next) => {
  res.render('remote', {
    mappingID: req.params.mappingid
  });
});


module.exports = router;
