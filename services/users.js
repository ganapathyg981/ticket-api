var database = require('../util/database')
var encrypt = require('../util/encryption')
var crypto = require('crypto');
function createUser(req, res, next) {
    let salt = crypto.randomBytes(16).toString('hex');
    var hashed = encrypt.hashPassword(req.body.password, salt);
    database.pool.query(`insert into users  (username,password,salt) values ('${req.body.username}','${hashed.hash}','${hashed.salt}')`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "Recorded inserted" })
    });
    console.log("Done")
}

function validateUser(req, res, next) {
    database.pool.query(`select username,password,salt from users where username='${req.body.username}'`, (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": err.code })
            return;
        }
        if (results[0]) {
            var hashed = encrypt.hashPassword(req.body.password, results[0].salt);
            if (hashed.hash === results[0].password) {
                res.status(200).json({ "message": "SUCCESS" })
                return;
            }
        }
        res.status(401).json({ "message": "FAILURE" })
    });
    console.log("Done")
}


module.exports = { createUser, validateUser }