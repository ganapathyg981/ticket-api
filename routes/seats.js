var express = require('express');
var router = express.Router();

var service= require('../services/seats')




// router.get('/',(req,res,next)=>{
//     service.getVacantSeats(req,res,next);
// })

router.post('/hold',(req,res,next)=>{
    service.holdseats(req,res,next);
})
router.post('/blockForPayment',(req,res,next)=>{
    service.blockSeatsForPayment(req,res,next);
})
router.post('/releaseFromPayment',(req,res,next)=>{
    service.releaseSeatsFromPayment(req,res,next);
})
router.post('/confirmBooking',(req,res,next)=>{
    service.confirmBooking(req,res,next);
}) 


module.exports=router