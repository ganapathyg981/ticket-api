const mongoose=require('mongoose')

const seat=mongoose.Schema(
    {
        name:Number,
        id:String,
        price:Number,
        gap:Boolean,
        booked:Boolean,
        blocked:Boolean
    }
)
const row=mongoose.Schema({
    row_name:String,
    seats:[seat]
})

const seat_layout=mongoose.Schema({
    name:String,
    layout:[row]
})
const SeatLayout= mongoose.model('seat_layout',seat_layout)

module.exports={
    SeatLayout,seat_layout,seat,row
}




