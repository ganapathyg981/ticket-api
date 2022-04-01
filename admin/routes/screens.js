var express = require('express');
var router = express.Router();
var service= require('../services/screens.js')


/*
  Creates an user for the ticket system
*/
router.post('/screen',(req,res,next)=>{
    service.createScreen(req,res,next);
  })


  module.exports=router