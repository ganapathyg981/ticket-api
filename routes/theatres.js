var express = require('express');
var router = express.Router();

var service= require('../services/theatres')




router.get('/',(req,res,next)=>{
    service.getCities(req,res,next);
})


module.exports=router