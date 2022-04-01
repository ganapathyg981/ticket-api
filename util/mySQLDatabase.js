var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 5,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'user_management'
});


var ticketPool  = mysql.createPool({
  connectionLimit : 5,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'ticket_app'
});



function queryDb(query, errorHandler, next,res) {
  ticketPool.query(query, (err, results, fields) => {
      if (err) {
         errorHandler(err,res);
         return;
      }
     next(results,res);
})
}


module.exports={pool,queryDb,ticketPool}




