const fs = require('fs');
const { stringify } = require('querystring');
const Tour = require('./../models/tourModel');
//alias'
const top5CheapAlias = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}
//route handlers
const getTours = async (req, res) => {
    try{
      // console.log(req.query);
      //hard storing the query from url
      let urlQueryObj = {...req.query};
      //formatting the hard copy to fit the parameter spec for mongoose methods
      excludeFields = ['sort', 'page', 'limit', 'fields'];
      excludeFields.forEach(value => delete urlQueryObj[value]);
      // console.log(urlQueryObj);
      queryStr = JSON.stringify(urlQueryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);
      urlQueryObj = JSON.parse(queryStr);
      // console.log(urlQueryObj);
      //query using the formatted hard copy
      let queryObj = Tour.find(urlQueryObj);
      //receives object of type query since await is not used here
      
      //SORTING query
      //we use the OG req.query here & not the hard copy
      if(req.query.sort){
        const sortVars = req.query.sort.split(',').join(' ');
        // console.log(sortVars);
        queryObj = queryObj.sort(sortVars);
      }

      //FIELDING query
      if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        queryObj = queryObj.select(fields);
      }
      else{
        queryObj = queryObj.select('-__v');
      }

      //PAGINATION
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 30;
      const skip = (page - 1) * limit;
      queryObj = queryObj.skip(skip).limit(limit);
      if(req.query.page){
        const numOfTours = await Tour.countDocuments();
        if(skip >= numOfTours){
          throw new Error('no more data at this page');
        }
      }

      //await here waits for the exec()method which turns the query object into array of documents
      const tours = await queryObj;
      console.log(tours);

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
    catch(err){
      res
      .status('400')
      .json({
        status: 'failed',
        message: err
      });
    }
}
const createTour = async(req, res) => {
    try{
        const newTour = await Tour.create(req.body);

        res
        .status(201)
        .json({
          status: 'success',
          data: {
            tour: newTour 
          }
      });
    }   
    catch(err){
      console.log(err);
        
      res
        .status('400')
        .json({
          status: 'failed',
          message: err
        });
    }
}
const getTourById = async (req, res) => {
  try{
      const tour = 
      await Tour.findById(req.params.id);

      res 
      .status(200)
      .json({
         status: 'success',
         data: {
           tour
          }
        });
    }
    catch(err){
      console.log(err);
        
      res
      .status('400')
      .json({
        status: 'failed',
        message: err
      });
    } 

}
const updateTourById = async (req, res) => {
    try{
        const tour = 
        await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res 
        .status(200)
        .json({
          status: 'success',
          data: {
          tour
          }
        });
      }
    catch(err){
      console.log(err);
        
      res
        .status('400')
        .json({
          status: 'failed',
          message: err
        });
    }
}
const deleteTourById = async (req, res) => {
    try{
        const tour = 
        await Tour.findByIdAndDelete(req.params.id);

        res 
         .status(200)
         .json({
            status: 'success',
            data: null
        });
    }
    catch(err){
        console.log(err);
        
        res
          .status('400')
          .json({
            status: 'failed',
            message: err
          });
    }
}

module.exports = {
    getTours,
    createTour,
    getTourById,
    updateTourById,
    deleteTourById,
    top5CheapAlias
};