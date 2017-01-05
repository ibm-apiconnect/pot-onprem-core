var express = require('express');
var router = express.Router();

/* Get portal-theme.zip */
router.route('/*')
  .get(function (req, res) {

    var path = req.params[0] ? req.params[0] : null;

    if (path) {
      var options = {
        root: './public/files/portal'
      };

      res.sendFile(path, options);
    } else {
      res.status(404).end();
    }

  })
  .head(function (req, res) {
    res.send(200);
  });

module.exports = router;