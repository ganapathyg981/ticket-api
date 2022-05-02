var express = require('express');
var router = express.Router();
var service= require('../services/theatres')


/*
  Creates an user for the ticket system
*/
router.post('/',(req,res,next)=>{
    service.createTheatre(req,res,next);
  })


  module.exports=router