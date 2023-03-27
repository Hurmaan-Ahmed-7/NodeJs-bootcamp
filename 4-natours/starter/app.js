const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
//adding middleware's
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});  
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


/////////////////////////////////////
//routing get requests using express.

// console.log(app);
// console.log(express);

// const port = 3000;
//  app.listen(port, () => {
//   console.log('port is on');
  
//  });

//  app.get('/', (req, res) =>{
//   res
//   .status(200)
//   .json({message: 'Hello from main'});

// });
//  app.get('/about', (req, res) =>{
//   res.send('hello to about');
// });
//  app.get('/exir', (req, res) =>{
//   res.send('hello to exit');
// });
// app.post('/', (req, res)=>{
//   res.send('you can post here')
//   .status(200);
// });
// app.use((req, res) => {
//   res.status(404).send('404 not found')
// });

////////////////////////////////////
//building the natours api using REST

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

// //sending json data to the client
// //upon request.

// app.get('/api/v1/tours', (req, res) => {
//   res
//   .status(200)
//   .json({
//     status: 'success',
//     data: {
//       tours: tours
//     }
//   })
// });

// //accepting json data from the client
// //and writing it to the file upon client
// //request

// app.post('/api/v1/tours', (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({id: newId}, req.body);
//   tours.push(newTour);
//   fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
//     res
//     .status(201)
//     .json({
//         status: 'success',
//         data: {
//             tour: newTour 
//         }
//     })
//   });
// });

// /////////////////////////////////////
// //handling url params

// app.get('/api/v1/tours/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
    
//     const tour = tours.find(function (el){
        
//         if(el.id == id){
//             // console.log(el.id);
//             return true;
//         }
//     });
//     if(!tour){
//         res
//         .status(404)
//         .json({
//             status: '404 not found',
//             data: {
//                 tour
//             }
//         });
//     }
//     else{
//     res
//     .status(200)
//     .json({
//         status: 'success',
//         data: {
//             tour
//         }
//     });
//     }
    
// });
// /////////////////////////////////////
// //handling patch requests

// app.patch('/api/v1/tours/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const tour = tours.find(function (el){
        
//         if(el.id == id){
//             // console.log(el.id);
//             return true;
//         }
//     }); 
//     //not implemented yet
//     //incomplete......

// });

/////////////////////////////////////
//refractored version of the code above

//route handlers
const getTours = (req, res) => {
    res
    .status(200)
    .json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tours: tours
      }
    })
}
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
      res
      .status(201)
      .json({
          status: 'success',
          data: {
              tour: newTour 
          }
      })
    });
}
const getTourById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    const tour = tours.find(function (el){
        
        if(el.id == id){
            // console.log(el.id);
            return true;
        }
    });
    if(!tour){
        res
        .status(404)
        .json({
            status: '404 not found',
            data: {
                tour
            }
        });
    }
    else{
    res
    .status(200)
    .json({
        status: 'success',
        data: {
            tour
        }
    });
    }
}
const updateTourById = (req, res) => {
    console.log('Incomplete');
    //yet to be implemented
    res.end();
}
const getUserById = (req, res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'This route is not supported yet'
    })
}
const getTourUsers = (req, res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'This route is not supported yet'
    })
}
const createTourUsers = (req, res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'This route is not supported yet'
    })
}
const updateUserById = (req, res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'This route is not supported yet'
    })
}
const deleteUserById = (req, res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'This route is not supported yet'
    })
}
//routers used to define express object
app
  .route('/api/v1/tours')
  .get(getTours)//request handler
  .post(createTour)//request handler

app
  .route('/api/v1/tours/:id')
  .get(getTourById)//request handler
  .patch(updateTourById)//request handler

app
  .route('/api/v1/users')
  .get(getTourUsers)
  .post(createTourUsers)

app
  .route('/api/v1/users/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById)

/////////////////////////////////////

//listening on localhost
const port = 3000;
app.listen(port, (req, res) =>{
  console.log('listening on port: ' + port);
});
