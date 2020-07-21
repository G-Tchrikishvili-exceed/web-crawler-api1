var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
//   res.render('index', {
//     title: 'WEB CRAWLER API',
//     description: 'you can use this urls:',
//   });
  res.status(200).send('health_CHECK is ok');
});

module.exports = router;
