var database = require('../util/mySQLDatabase')
function createShow(req, res, next) {
    database.pool.query(`insert into show  (name,start_time,end_time,screen_id,movie_id,layout_id,addedON) values
     ('${req.body.name}','${req.body.start_time}','${req.body.end_time}',${req.body.screen_id},${req.body.movie_id},${req.body.layout_id},NOW())`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}


module.exports={createShow}