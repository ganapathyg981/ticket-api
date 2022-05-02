var codec = require('json-url')('lzw');
var obj = { one: 1, two: 2, three: [1,2,3], four: 'red pineapples' };
codec.compress("sdsadsd").then(result =>{
  console.log(result);
  codec.decompress(result).then(dec=>console.log(dec))
});
/* Result: woTCo29uZQHCo3R3bwLCpXRocmVlwpMBAgPCpGZvdXLCrsSOZCBwacSDYXBwbGVz */