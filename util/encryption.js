var crypto = require('crypto'); 



function hashPassword(password,salt) { 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       let hash = crypto.pbkdf2Sync(password,salt,  
       1000, 64, `sha512`).toString(`hex`); 

       return{
           hash,
           salt
       }
}; 

module.exports={hashPassword}

