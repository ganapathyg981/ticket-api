var express = require('express');
var router = express.Router();

var service= require('../services/shows')

router.get('/theatre/:id',(req,res,next)=>{
    service.getShowsByTheatre(req,res,next);
})

router.get('/movie/:id',(req,res,next)=>{
    service.getShowsByMovie(req,res,next);
})

module.exports=router