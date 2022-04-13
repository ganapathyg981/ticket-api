var database = require('../../util/mySQLDatabase')
var createSeatQuery=require('../../util/createSeatLayout')
function createScreen(req, res, next) {
    database.ticketPool.query(`insert into screens (name,theatre_id,addedON,no_rows,seats,gaps) values  ('${req.body.name}',${req.body.theatre_id},NOW(),${req.body.rows},${req.body.seats},'${req.body.gap}')`, (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": err.code })
            return;
        }
        database.ticketPool.query('insert into seats (row_name,seat_number,screen_id,gap,price) values ?',
        [createSeatQuery.createSeatQuery(req.body.rows,req.body.seats,req.body.price,req.body.gap,results.insertId)],(err,results)=>{
            if (err) {
                console.log(err);

                res.status(500).json({ "message": err.code })
                return;
            }   
            res.status(200).json({ "message": "Recorded inserted" })
            return
        })
        
    });
}


module.exports={createScreen}