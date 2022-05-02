var express = require('express');
var router = express.Router();

var service= require('../services/movies')




router.get('/city/:id',(req,res,next)=>{
    service.getMovieByCity(req,res,next);
})

router.get('/',(req,res,next)=>{
    service.getMovie(req,res,next);
})


module.exports=router