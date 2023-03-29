const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


//route handlers
const getTours = (req, res) => {
    res
    .status(200)
    .json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        //tours: tours
      }
    })
}
const createTour = (req, res) => {
    //const newId = tours[tours.length - 1].id + 1;
    //const newTour = Object.assign({id: newId}, req.body);
    //tours.push(newTour);
    //fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
      res
      .status(201)
      .json({
          status: 'success',
          data: {
              tour: newTour 
          }
      })
   // });
}
const getTourById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    //const tour = tours.find(function (el){
        
        // if(el.id == id){
        //     // console.log(el.id);
        //     return true;
        // }
    //});
    // if(!tour){
    //     res
    //     .status(404)
    //     .json({
    //         status: '404 not found',
    //         data: {
    //             tour
    //         }
    //     });
    // }
    // else{
    // res
    // .status(200)
    // .json({
    //     status: 'success',
    //     data: {
    //         //tour
    //     }
    // });
    // }
}
const updateTourById = (req, res) => {
    console.log('Incomplete');
    //yet to be implemented
    res.end();
}

module.exports = {
    getTours,
    createTour,
    getTourById,
    updateTourById
};