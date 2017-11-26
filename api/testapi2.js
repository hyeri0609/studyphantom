'use strict';

var express = require('express');
var router = express.Router();

router.get('/',function(req, res){    
  res.json({ message: 'hooray! welcome to our api2!' }); 
});

router.post('/', function(req, res) {
  // Create user
  res.json({ message: 'hooray! post api2!' }); 
});

module.exports = router;