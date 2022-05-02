
const getMySQLDate=(date)=>{
    const isoDateString=new Date(date).toISOString();
    const isoDate=new Date(isoDateString);
    const mySQLDate=isoDate.toJSON().slice(0,19).replace('T',':')
    return mySQLDate;
}

// console.log(getMySQLDate("02-25-2022 10:00")); 

module.exports={getMySQLDate}
