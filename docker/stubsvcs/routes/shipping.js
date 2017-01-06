var express = require('express');
var router = express.Router();

/* Shipping Calculator */

router.route('/calculate')
  .get(function(req, res) {
    var company = req.query.company;
    var from_zip = parseInt(req.query.from_zip);
    var to_zip = parseInt(req.query.to_zip);

    var price = (from_zip + to_zip)/10000;
    price = (company == "xyz") ? price * 1.1 : price;

    var replyObj = {
      company: company,
      rates: {
        next_day: Number(price * 1.9).toFixed(2),
        two_day: Number(price * 1.3).toFixed(2),
        ground: Number(price).toFixed(2)
      }
    };

    res.json(replyObj);
  })
  .head(function(req, res) {
    res.send(200);
  });

router.route('/schema')
  .get(function (req, res) {
    var schema = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "http://jsonschema.net",
      "type": "object",
      "properties": {
        "company": {
          "id": "http://jsonschema.net/company",
          "type": "string"
        },
        "rates": {
          "id": "http://jsonschema.net/rates",
          "type": "object",
          "properties": {
            "next_day": {
              "id": "http://jsonschema.net/rates/next_day",
              "type": "string"
            },
            "two_day": {
              "id": "http://jsonschema.net/rates/two_day",
              "type": "string"
            },
            "ground": {
              "id": "http://jsonschema.net/rates/ground",
              "type": "string"
            }
          }
        }
      },
      "required": [
        "company",
        "rates"
      ]
    };
  
    res.json(schema);
  })
  .head(function (req, res) {
    res.send(200);
  });

module.exports = router;
