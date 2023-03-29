const fs = require('fs');
const Tour = require('./../models/tourModel');
//route handlers
const getTours = async (req, res) => {
    try{
        const tours = await Tour.find();
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
    deleteTourById
};