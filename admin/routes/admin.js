var express = require('express');
var router = express.Router();
var userRouter= require('./users')
var cityRouter= require('./cities')
var theatreRouter= require('./theatres')
var movieRouter= require('./movie')
var seatLayoutRouter= require('./seat_layout')
var showRouter= require('./shows')
var screenRouter= require('./screens')
router.use('/user',userRouter);
router.use('/city',cityRouter);
router.use('/screen',screenRouter);
router.use('/show',showRouter);
router.use('/theatre',theatreRouter);
router.use('/movie',movieRouter);
// router.use('/seat',seatLayoutRouter);

module.exports=router;