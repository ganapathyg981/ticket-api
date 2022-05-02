var express = require('express');
var router = express.Router();
var service= require('../services/movies.js')


/*
  Creates an user for the ticket system
*/
router.post('/',(req,res,next)=>{
    service.createMovie(req,res,next);
  })


  module.exports=router