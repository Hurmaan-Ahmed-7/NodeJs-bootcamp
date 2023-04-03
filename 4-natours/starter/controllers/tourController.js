const { clear } = require('console');
const fs = require('fs');
const { stringify } = require('querystring');
const Tour = require('./../models/tourModel');
class ApiQueryFeatures{
  constructor(queryObj, urlQueryObj){
    this.queryObj = queryObj;
    this.urlQueryObj = urlQueryObj;
  }
  filter(){
    // console.log('filtering...');
    //hard storing the query from url
    let urlQueryObj = {...this.urlQueryObj};
    //formatting the hard copy to fit the parameter spec for mongoose methods
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(value => delete urlQueryObj[value]);
    let queryStr = JSON.stringify(urlQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);
    urlQueryObj = JSON.parse(queryStr);
    //filter using the formatted hard copy
    //receives object of type query since await is not used here
    this.queryObj = Tour.find(urlQueryObj);
    //for method chaining
    return this;
  }
  sorting(){
    if(this.urlQueryObj.sort){
    // console.log('sorting...');
    // console.log(this.urlQueryObj);
    const sortVars = this.urlQueryObj.sort.split(',').join(' ');
    this.queryObj = this.queryObj.sort(sortVars);
    // console.log('sorting end');
    }
    return this;
  }
  fielding(){
    if(this.urlQueryObj.fields){
    // console.log('fielding...');
    const fields = this.urlQueryObj.fields.split(',').join(' ');
    this.queryObj = this.queryObj.select(fields);
    }
    return this;
  }
  async pagination(){
    if(this.urlQueryObj.page){
    // console.log('paginating...');
    const page = this.urlQueryObj.page * 1 || 1;
    const limit = this.urlQueryObj.limit * 1 || 30;
    const skip = (page - 1) * limit;
    this.queryObj = this.queryObj.skip(skip).limit(limit);
    
    const numOfTours = await Tour.countDocuments();
    if(skip >= numOfTours){
        throw new Error('no more data at this page');
    }
    }
    return this;
  }
}

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
      const features = new ApiQueryFeatures(Tour.find(), req.query);
      features
        .filter()
        .sorting()
        .fielding()
        .pagination();
      //await here waits for the exec()method which turns the query object into array of documents
      const tours = await features.queryObj;
      
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