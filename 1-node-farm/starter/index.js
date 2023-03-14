const fs = require('fs');
//synchronous 
const input = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(input);

const writeOutput = `${input} created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', writeOutput);
console.log('file written');

//async

const asyncInput = fs.readFile('./txt/input.txt', 'utf-8', function(err, data){
    console.log(`file is read : \n ${data}`);
});
console.log('reading file async way');
 