var database = require('../../util/mySQLDatabase')
var encrypt = require('../../util/encryption')
var crypto = require('crypto');
function createUser(req, res, next) {
    let salt = crypto.randomBytes(16).toString('hex');
    var hashed = encrypt.hashPassword(req.body.password, salt);
    database.ticketPool.query(`insert into users  (email,password,salt,name) values ('${req.body.email}','${hashed.hash}','${hashed.salt}','${req.body.name}')`, 
    (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}


module.exports={createUser}