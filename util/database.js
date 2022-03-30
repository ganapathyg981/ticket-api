var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 5,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'user_management'
});



module.exports={pool}




