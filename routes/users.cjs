var express = require('express');
var router = express.Router();
var service= require('../services/users.js')




/*
  Validates user when sent credentials
*/
router.post('/validateUser',(req,res,next)=>{
  service.validateUser(req,res,next);
})

module.exports = router;
