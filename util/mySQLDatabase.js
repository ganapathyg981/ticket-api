var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'user_management'
});


var ticketPool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ticket_app'
});



function queryDb(query, errorHandler, next, res) {
  ticketPool.query(query, (err, results, fields) => {
    if (err) {
      errorHandler(err, res);
      return;
    }
    next(results, res);
  })
}

function queryDbWithOptions(options) {
  const {tableName, columns, filter, orderBy, order, pageSize, page} = options;
  var query = 'Select '
  if (columns.length == 0) query += '*'
  columns.forEach((column, index) => {
    if (index === columns.length - 1)
      query += column;
    else
      query += column + ', ';
  })
  query += ' from ' + tableName;



  var conditions = [];
  for (key in filter) {
    if (filter[key].length == 1) {
      conditions.push(key + "= " + filter[key[0]])
    }
    else {
      let condition = key + "= ";
      filter[key].forEach((value, index) => {

        if (index === filter[key].length - 1) {
          if (typeof value === 'string' || value instanceof String)
            condition += "'" + value + "'"
          else
            condition += value
        }
        else {
          if (typeof value === 'string' || value instanceof String)
            condition += "'" + value + "' OR "
          else
            condition += value + " OR "
        }
      })
      conditions.push('(' + condition + ')');

    }
  }

  var conditionString = ' where '
  conditions.forEach((condition, index) => {
    if (index == conditions.length - 1) {
      conditionString += condition;
    }
    else {
      conditionString += condition + " AND "
    }
  })
  if (filter)
    query += conditionString;

  var orderByString = ' ORDER BY ' + orderBy;

  if (order) {
    orderByString += " " + order;
  }

  if (orderBy)
    query += orderByString;


  if (pageSize && page) {
    let offset = (page - 1) * pageSize;
    let row_count = pageSize;
    query += ` LIMIT ${row_count} OFFSET ${offset}`
  }

  return query;
}

function getOptions(tableName,req){
  let options={
    tableName,
    columns:req.query.include?JSON.parse(req.query.include):[],
    filter:req.query.filter?JSON.parse(req.query.filter):null,
    orderBy:req.query.orderBy,
    order:req.query.order?req.query.order:'ASC',
    pageSize:req.query.pageSize,
    page:req.query.page
}
  console.log(options);
    return options;
}


module.exports = { pool, queryDb, ticketPool,queryDbWithOptions,getOptions }




