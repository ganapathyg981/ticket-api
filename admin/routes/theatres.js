var express = require('express');
var router = express.Router();
var service= require('../services/users.js')


/*
  Creates an user for the ticket system
*/
router.post('/theatre',(req,res,next)=>{
    service.createUser(req,res,next);
  })


  module.exports=router