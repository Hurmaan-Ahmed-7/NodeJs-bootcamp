const Tour = require('./../models/tourModel');
const ApiQueryFeatures = require('./../utils/apiFeatures.js');

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
      // features
      //   .filter()
      //   .sorting()
      //   .fielding()
      //   .pagination();
      console.log(features);
      console.log(features.filter());
      console.log(features.sorting());
      console.log(features.fielding());
      console.log(features.pagination());
      
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