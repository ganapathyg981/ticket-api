// const mongoose=require('mongoose')
// var seatModel= require('../../models/seat_layout')
// var createSeat= require('../../util/createSeatLayout')
//  function createSeatLayout(req, res, next) {
//         console.log("here");
//         mongoose.connect('mongodb://localhost:27017/ticket_app', { useNewUrlParser: true }).then((mongoose)=>{
//             seatModel.SeatLayout.create(createSeat(req.body.name,req.body.rows,req.body.seats,req.body.price,req.body.gaps))
//             .then((value)=>{
//                 res.status(200).json({"message":"SUCCESS"})
//             })
//             .catch(err=>{
//                 console.log(err);
//                 res.status(500).json(err);    
//             })
//             .finally(()=>{
//                 mongoose.connection.close().then(()=>console.log("closed"));
//             })
//         }).catch(err=>{
//             res.status(500).json(err);    
//         })
       
    
// }


// module.exports={createSeatLayout}