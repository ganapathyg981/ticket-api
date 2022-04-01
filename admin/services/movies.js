var database = require('../../util/mySQLDatabase')
function createMovie(req, res, next) {
    database.pool.query(`insert into movie  (name,rating,addedON) values ('${req.body.name}','${req.body.rating}',NOW())`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}


module.exports={createMovie}