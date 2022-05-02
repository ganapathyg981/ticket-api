function createSeat(name,rows,seats,price,gap){
    console.log("HERE");
    var layout=[];
        var gaps_after=new Set();
        Array.from(gap).forEach(element => {
            gaps_after.add(element)
        });
        for(let x=0;x<rows;x++){
                layout.push({row_name:String.fromCharCode(x+65)})
                let seat=[];
                for(let i=0;i<seats;i++){
                    seat.push({name:i,id:x+'-'+i,price});
                    if(gaps_after.has(i)){
                        seat.push({gap:true})
                    }
                }
                layout[x].seats=seat;
                // console.log(layout[x]);
        }
        return ({layout,name})
}
function createSeatQuery(rows,seats,price,gap,screen_id){

    console.log("HERE");
    let seat=[];
    gap=gap.split('|');
        var gaps_after=new Set();
        Array.from(gap).forEach(element => {
            gaps_after.add(parseInt(element))
        });
        console.log(gaps_after);
        for(let x=0;x<rows;x++){
               
                for(let i=1;i<=seats;i++){
                    seat.push([String.fromCharCode(x+65),i,screen_id,0,price]);
                    if(gaps_after.has(i)){
                        seat.push([String.fromCharCode(x+65),-1,screen_id,1,0])
                    }
                }
        }
        // console.log(seat);
        return seat
}

// console.log(createSeatQuery(25,20,200,'10|20',2))

module.exports={createSeatQuery};