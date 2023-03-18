const fs = require('fs');
const http = require('http');
////////////////////////////////---

// //synchronous reading and writing

// const input = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(input);

// const writeOutput = `${input} created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', writeOutput);
// console.log('file written');

////////////////////////////////---

// //async reading and writing

// const asyncInput = fs.readFile('./txt/input.txt', 'utf-8', function(err, data){
//     console.log(`file is read : \n ${data}`);
// });
// console.log('reading file async way');
 
/////////////////////////////////---

//creating server

// const serverResult = http.createServer((req, res) => {
//     res.end("hello");
// });
// console.log(serverResult);


// serverResult.listen(8000, '127.0.0.1', ()=>{
//     console.log('listening');
    
// });

///////////////////////////////////---

//routing, based on response object, we map the right controller functions.

// const serverResult = http.createServer((req, res) => {
//     const reqUrl = req.url;
//     console.log(reqUrl);
    
//     if(reqUrl === '/'){
//         res.end('main page')
//     }
//     else if(reqUrl === '/cart'){
//         res.end('this is your cart');
//     }
//     else if(reqUrl === '/item'){
//         res.end('this is your item');
//     }
//     else{
//         res.writeHead(404, {
//             'content-type' : 'text/html'
//         });
//         res.end('<h1>invalid url</h1>')
//     }
// });
// console.log(serverResult);


// serverResult.listen(8000, '127.0.0.1', ()=>{
//     console.log('listening');
    
// });

////////////////////////////////---

//node-farm example
const dataForApi = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataForApiObj = JSON.parse(dataForApi);

const serverResult = http.createServer((req, res) => {
    const reqUrl = req.url;
    console.log(reqUrl);
    
    if(reqUrl === '/'){
        res.end('main page')
    }
    else if(reqUrl === '/cart'){
        res.end('this is your cart');
    }
    else if(reqUrl === '/item'){
        res.end('this is your item');
    }
    else if(reqUrl === '/api'){
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        });
        res.end(dataForApi);
    }
    else{
        res.writeHead(404, {
            'Content-Type' : 'text/html'
        });
        res.end('<h1>invalid url</h1>')
    }
});
console.log(serverResult);


serverResult.listen(8000, '127.0.0.1', ()=>{
    console.log('listening');
});