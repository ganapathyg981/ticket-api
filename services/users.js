var database = require('../util/mySQLDatabase')
var encrypt = require('../util/encryption')

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


module.exports = { validateUser }