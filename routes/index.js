const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).send('health_CHECK is ok');
});

module.exports = router;
