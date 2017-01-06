var express = require('express');
var router = express.Router();

/* GET oauthtester page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'API Connect PoT OAuth Tester' });
});

module.exports = router;