var database = require('../../util/mySQLDatabase')
const dateFormatter= require('../../util/dateFormatter')
var seatModel= require('../../models/seat_layout')
var showBooking=require('../../models/show_bookings')
const mongoose=require('mongoose')
function createShow(req, res, next) {

    database.ticketPool.query(`insert into ticket_app.shows  (name,start_time,screen_id,movie_id,addedON) values ('${req.body.
        name}','${dateFormatter.getMySQLDate(req.body.start_time)}',${req.body.screen_id},${req.body.movie_id},NOW())`, (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": err.code })
            return;
        }

        return res.status(200).json({"message":"SUCCESS"})
    });

    console.log("Done")
}


module.exports={createShow}