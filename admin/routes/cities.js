var express = require('express');
var router = express.Router();
var service= require('../services/cities.js')


/*
  Creates an user for the ticket system
*/
router.post('/city',(req,res,next)=>{
    service.createCity(req,res,next);
  })


  module.exports=router