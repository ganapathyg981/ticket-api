var database = require('../util/mySQLDatabase')


const getCities=(req,res,next)=>{
    database.queryDb('select * from cities',(err,res)=>{
        res.status(500).json({'message':'Something went wrong'})},
        (response)=>{
            res.status(200).json({'data':response,'message':'SUCCESS'})
        },
        res
    )
}


module.exports={getCities}