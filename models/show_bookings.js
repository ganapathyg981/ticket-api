const mongoose=require('mongoose')
const seatLayout= require('./seat_layout')


const show_booking=mongoose.Schema({
    show_id:Number,
    seats:[seatLayout.row]
})


const showBooking=mongoose.model('show_bookings',show_booking)

module.exports=showBooking