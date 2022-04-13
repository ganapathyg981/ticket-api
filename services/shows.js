var database = require('../util/mySQLDatabase')
function getMovie(req, res, next) {
    let options=database.getOptions('movie',req)

    database.ticketPool.query(database.queryDbWithOptions(options), (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "message": err.code })
            return;
        }
        res.status(200).json({ "message": "SUCCESS",data: results })
    });
    console.log("Done")
}
function getShowsByMovie(req, res, next) {
    // console.log(req);
    database.ticketPool.query(`SELECT m.id as movie_id,m.name as movie_name,t.id as theatre_id, t.name as theatre_name ,sh.*
    FROM theatres AS t 
    JOIN screens s ON t.id=s.theatre_id
    JOIN shows sh ON sh.screen_id=s.id
    JOIN movie m ON m.id=sh.movie_id where m.id=${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        let movie_data=results.length>0?{movie_id:results[0].movie_id,
            movie_name:results[0].movie_name}:undefined;
        res.status(200).json({ "message": "SUCCESS" ,data:{...movie_data,theatres:movieShowMapper(results)}})
    });
    console.log("Done")
}

function getShowsByTheatre(req, res, next) {
    // console.log(req);
    database.ticketPool.query(`SELECT m.id as movie_id,m.name as movie_name,t.id as theatre_id, t.name as theatre_name ,sh.*
    FROM theatres AS t 
    JOIN screens s ON t.id=s.theatre_id
    JOIN shows sh ON sh.screen_id=s.id
    JOIN movie m ON m.id=sh.movie_id where t.id=${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ "message": err.code })
            return;
        }
        let theatre_data=results.length>0?{theatre_id:results[0].theatre_id,
            theatre_name:results[0].theatre_name}:undefined;
        res.status(200).json({ "message": "SUCCESS" ,data:{...theatre_data,movies:theatreShowMapper(results)}})
    });
    console.log("Done")
}
function theatreShowMapper(input){
    let output=[];
    let addedMovies= new Set();
    
    for(entity of input){
    
      if(addedMovies.has(entity.movie_id)){
                let current=output.filter(element=>{
                    return element.movie_id==entity.movie_id;
                })
                current[0].shows.push({show_id:entity.id,show_time:entity.start_time})
      }
      else{
          output.push({
              "movie_id": entity.movie_id,
              "movie_name":entity.movie_name,
              "shows":[{show_id:entity.id,show_time:entity.start_time}]
          })
          addedMovies.add(entity.movie_id)
      }
    }
    return output
    
}

function movieShowMapper(input){
    let output=[];
    let addedTheatres= new Set();
    
    for(entity of input){
    
      if(addedTheatres.has(entity.theatre_id)){
                let current=output.filter(element=>{
                    return element.theatre_id==entity.theatre_id;
                })
                current[0].shows.push({show_id:entity.id,show_time:entity.start_time})
      }
      else{
          output.push({
              "theatre_id": entity.theatre_id,
              "theatre_name":entity.theatre_name,
              "shows":[{show_id:entity.id,show_time:entity.start_time}]
          })
          addedTheatres.add(entity.theatre_id)
      }
    }
    return output
    
}




module.exports={getShowsByTheatre,getMovie,getShowsByMovie}