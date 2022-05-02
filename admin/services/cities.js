var database = require('../../util/mySQLDatabase')
function createCity(req, res, next) {
    database.ticketPool.query(`insert into cities  (cityName,active,addedON) values ('${req.body.name}',1,NOW())`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}


module.exports={createCity}