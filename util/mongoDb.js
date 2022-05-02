// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/"
// var createSeat=require('./createSeatLayout')

// async function dbTry(){
//     MongoClient.connect(url, async (err, dbo) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         var layout_seat=createSeat(2,15,30,140,[20])
//         var db = dbo.db('ticket_app');
//         db.collection('seat_layout').insertOne(layout_seat).then((value)=>{
//             console.log(value);
//         }).catch(err=>{
//             console.log(err);
//         }).finally(()=>{
//             dbo.close();
//         });
//         // dbo.close();
        

//     })
// }
// async function mongodb(callback){
//     MongoClient.connect(url,callback);
// }


// dbTry();


// module.exports= mongodb;