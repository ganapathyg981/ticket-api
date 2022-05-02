const { async } = require('@babel/runtime/regenerator');
var mysqlPool = require('../util/mysqlPromiseDb')
async function holdseats(req, response, next) {
    console.log(req.body);
    let connection=await mysqlPool.getConnection();
    try{
        
        await connection.beginTransaction();
        const [results,fields]=await connection.query("select * from seat_booking as sb where sb.show_id=? and sb.seat_id in (?) and (sb.status!=0) FOR UPDATE",[
            req.body.show_id,req.body.seats.join(',')]);
            if(results.length>0){
                await connection.rollback();
                return response.status(200).json({message:"NOT AVAILABLE",seats_available:false})
            }
          const[results1,fields1]=  await connection.query("insert into booking (show_id,user_id,paid,confirmed) values (?)",[[req.body.show_id,req.body.user_id,0,0]]);
            await connection.query("insert into seat_booking (seat_id,booking_id,show_id,status) values ?",[req.body.seats.map(seat=>[seat,results1.insertId,req.body.show_id,1])])
            await connection.commit();
            setTimeout(()=>{
                setBookingStatus(results1.insertId,1,0);
            },60000)
            response.status(200).json({"message":"SUCCESS",booking_id:results1.insertId})
    }
    catch(err){
        await connection.rollback();
        return response.status(500).json({ "message": err.code })
    }
    finally{
        connection.release();
    }
}

async function blockSeatsForPayment(req,res,next){
    try{
       let result= await setBookingStatus(req.body.booking_id,1,2);
       if(result.success==false){
           res.status(500).json({message:"Something went wrong"});
       }
       else{
           res.status(200).json({message:"SUCCESS"})
       }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }

}

async function releaseSeatsFromPayment(req,res,next){
    try{
       let result= await setBookingStatus(req.body.booking_id,2,0);
       if(result.success==false){
           res.status(500).json({message:"Something went wrong"});
       }
       else{
           res.status(200).json({message:"SUCCESS"})
       }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }

}

async function confirmBooking(req,res,next){
    try{
       let result= await setBookingStatus(req.body.booking_id,2,3);
       if(result.success==false){
           res.status(500).json({message:"Something went wrong"});
       }
       else{
           res.status(200).json({message:"SUCCESS"})
       }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }

}



async function setBookingStatus(booking_id,current_status,set_status){
    let connection=await mysqlPool.getConnection();
    try{
        await connection.beginTransaction();
        const [results,fields]=await connection.query("select * from booking where id= and where status = ? FOR UPDATE",[booking_id,current_status]);
            if(results.length>0){
                await connection.query("update booking set status=? where id=?",[set_status,booking_id])
                await connection.commit();
                return {success:true,results:results};
            }
            else{
                await connection.commit();
                return {success:false}
            }
            
    }
    catch(err){
        await connection.rollback();
        return {success:false}
    }
    finally{
        connection.release();
    }
}


module.exports = { holdseats ,blockSeatsForPayment,releaseSeatsFromPayment,confirmBooking}