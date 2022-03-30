var express = require('express');
var router = express.Router();
var service= require('../services/users.js')
/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});




router.post('/',(req,res,next)=>{
  service.createUser(req,res,next);
})

router.post('/validateUser',(req,res,next)=>{
  service.validateUser(req,res,next);
})

module.exports = router;
