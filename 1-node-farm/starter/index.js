const fs = require('fs');
const http = require('http');
////////////////////////////////

// //synchronous reading and writing

// const input = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(input);

// const writeOutput = `${input} created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', writeOutput);
// console.log('file written');
////////////////////////////////

// //async reading and writing

// const asyncInput = fs.readFile('./txt/input.txt', 'utf-8', function(err, data){
//     console.log(`file is read : \n ${data}`);
// });
// console.log('reading file async way');
 
/////////////////////////////////
//creating server

const serverResult = http.createServer((req, res) => {
    res.end("hello");
});

serverResult.listen(8000, '127.0.0.1', ()=>{
    console.log('listening');
    
});