var database = require('../../util/mySQLDatabase')
function createTheatre(req, res, next) {
    database.pool.query(`insert into theatres  (name,cityID,addedON) values ('${req.body.name}','${req.body.city_id}',NOW())`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}


module.exports={createTheatre}