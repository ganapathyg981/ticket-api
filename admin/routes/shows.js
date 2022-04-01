var express = require('express');
var router = express.Router();
var service= require('../services/shows.js')


/*
  Creates an user for the ticket system
*/
router.post('/show',(req,res,next)=>{
    service.createShow(req,res,next);
  })


  module.exports=router