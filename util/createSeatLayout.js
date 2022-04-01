function createSeat(id,rows,seats,price,gap){
    var layout=[];
        var gaps_after=new Set();
        gap.forEach(element => {
            gaps_after.add(element)
        });
        for(let x=0;x<rows;x++){
                layout.push({row_name:String.fromCharCode(x+65)})
                let seat=[];
                for(let i=0;i<seats;i++){
                    seat.push({name:i,id:x+''+i,price});
                    if(gaps_after.has(i)){
                        seat.push({gap:true})
                    }
                }
                layout[x].seat=seat;
                // console.log(layout[x]);
        }
        return {layout_id:id,layout}
}


module.exports=createSeat;