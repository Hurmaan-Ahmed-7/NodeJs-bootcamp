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

//node-farm routing 

// const dataForApi = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataForApiObj = JSON.parse(dataForApi);

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
//     else if(reqUrl === '/api'){
//         res.writeHead(200, {
//             'Content-Type' : 'application/json'
//         });
//         res.end(dataForApi);
//     }
//     else{
//         res.writeHead(404, {
//             'Content-Type' : 'text/html'
//         });
//         res.end('<h1>invalid url</h1>')
//     }
// });
// console.log(serverResult);


// serverResult.listen(8000, '127.0.0.1', ()=>{
//     console.log('listening');
// });

// ////////////////////////////////---

// //sending html on req 

// const dataForApi = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataForApiObj = JSON.parse(dataForApi);
// const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
// console.log(overview);


// const serverResult = http.createServer((req, res) => {
//     const reqUrl = req.url;
//     console.log(reqUrl);
    
//     if(reqUrl === '/'){
//         res.writeHead(200, {
//             'Content-Type' : 'text/html'
//         });
//         res.end(overview);
//     }
//     else if(reqUrl === '/cart'){
//         res.end('this is your cart');
//     }
//     else if(reqUrl === '/item'){
//         res.end('this is your item');
//     }
//     else if(reqUrl === '/api'){
//         res.writeHead(200, {
//             'Content-Type' : 'application/json'
//         });
//         res.end(dataForApi);
//     }
//     else{
//         res.writeHead(404, {
//             'Content-Type' : 'text/html'
//         });
//         res.end('<h1>invalid url</h1>')
//     }
// });
// console.log(serverResult);


// serverResult.listen(8000, '127.0.0.1', ()=>{
//     console.log('listening');
// });

////////////////////////////////---

//injecting html into document on the server
//server side rendering USING json data


const dataForApi = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataForApiObj = JSON.parse(dataForApi);
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
let cardTemplate = fs.readFileSync(`${__dirname}/templates/card-template.html`, 'utf-8');


function serverHtmlRender(el){
    
    let output = cardTemplate.replace(/{%IMAGE%}/g, el.image);

    output = output.replace(/{%PRODUCT_NAME%}/g, el.productName);

    output = output.replace(/{%QUANTITY%}/g, el.quantity);

    output = output.replace(/{%PRICE%}/g, el.price);

    if(el.organic){
        output = output.replace(/{%ORGANIC%}/g,  'ORGANIC');
    }
    return output; 
}

const injectHtml = dataForApiObj.map(el => 
    serverHtmlRender(el)
).join('');

// console.log(injectHtml);
const Output = overviewTemplate.replace('{%INJECT%}', injectHtml);
// console.log(Output);

const serverResult = http.createServer((req, res) => {
    const reqUrl = req.url;
    console.log(reqUrl);
    
    if(reqUrl === '/'){
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        
        res.end(Output);
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