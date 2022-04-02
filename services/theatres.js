var database = require('../util/mySQLDatabase')
function getCities(req, res, next) {
    let options=database.getOptions('theatres',req)

    database.ticketPool.query(database.queryDbWithOptions(options), (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "SUCCESS",data: results })
    });
    console.log("Done")
}


module.exports={getCities}