var database = require('../../util/mySQLDatabase')
const dateFormatter= require('../../util/dateFormatter')
function createShow(req, res, next) {
    database.ticketPool.query(`insert into ticket_app.shows  (name,start_time,screen_id,movie_id,addedON,layout_id) values ('${req.body.
        name}','${dateFormatter.getMySQLDate(req.body.start_time)}',${req.body.screen_id},${req.body.movie_id},NOW(),1)`, (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}


module.exports={createShow}