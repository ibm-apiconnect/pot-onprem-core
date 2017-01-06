var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');

var wsdl = "";

/* Calculate Financing Rate from SOAP input */
router.route('/calculate')
  .get(function (req, res) {

    var options = {
      root: './public/files/financing',
      headers: {
        'Content-Type': 'application/wsdl+xml'
      }
    };

    res.sendFile('financing.wsdl', options);
  })
  .post(function (req, res) {
    console.log(req.body);
  
    var parseString = require('xml2js').parseString;
    var parseOptions = {
      trim: true,
      explicitArray: false,
      ignoreAttrs: true,
      explicitRoot: false
    };
  
    parseString(req.body, parseOptions, function (err, result) {
      console.log("XML as JSON:\n" + JSON.stringify(result));
      var soapBody = result['soap-env:Body'] || result['soapenv:Body'];
      var ns = JSON.stringify(soapBody).substring(2).split(':')[0];
      var financingRequest = soapBody[ns + ':financingRequest'];
      var amount = financingRequest[ns + ':amount'];
      var duration = financingRequest[ns + ':duration'];
      var rate = financingRequest[ns + ':rate'];
      
      console.log("amount: " + amount);
      console.log("duration: " + duration);
      console.log("rate: " + rate);
  
      var P = amount;
      var N = duration;
      var J = rate / 100;
      J /= 12;
      var K = 1 / (Math.pow(1 + J, N));
      var quote = P * (J / (1 - K));
      var monthlyPaymentAmount = Math.round(quote * 100) / 100;
  
      res.set('content-type', 'application/xml');
      res.set('accept', 'application/xml');
      res.send("<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ser=\"http://thinkibm-services.mybluemix.net\"><soap-env:Body><ser:financingResult><ser:paymentAmount>" + monthlyPaymentAmount + "</ser:paymentAmount></ser:financingResult></soap-env:Body></soap-env:Envelope>");
    });
  
  })
  .head(function (req, res) {
    res.send(200);
  });

module.exports = router;