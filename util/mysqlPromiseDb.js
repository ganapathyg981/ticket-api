const Promise =  require('bluebird');
const mysql = require('mysql2/promise');

const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ticket_app',
    password:'root',
    connectionLimit: 30,
  });

module.exports=pool;

  
