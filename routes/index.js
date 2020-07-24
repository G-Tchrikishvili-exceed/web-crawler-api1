var express = require('express'); //var is deprecated, use let/const insted
var router = express.Router(); //var is deprecated, use let/const insted

/* GET home page. */
router.get('/', function (req, res) {
//   res.render('index', {
//     title: 'WEB CRAWLER API',
//     description: 'you can use this urls:',
//   });
// //// unnecessary comments ^^^^^
  res.status(200).send('health_CHECK is ok');
});

module.exports = router;
