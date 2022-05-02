var database = require('../util/mySQLDatabase')
function getMovie(req, res, next) {
    let options=database.getOptions('movie',req)

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

function getMovieByCity(req, res, next) {
    // console.log(req);
    database.ticketPool.query(`SELECT m.id,m.name FROM theatres AS t JOIN screens s ON t.id=s.theatre_id JOIN
     shows sh ON sh.screen_id=s.id JOIN movie m ON m.id=sh.movie_id where t.cityid=${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "SUCCESS" ,data:results})
    });
    console.log("Done")
}


module.exports={getMovieByCity,getMovie}