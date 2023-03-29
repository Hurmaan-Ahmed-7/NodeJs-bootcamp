const express = require('express');
const Router = express.Router();
const tourController = require(`./../controllers/tourController`);
//Router.param('id', tourController.checkID);

Router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.createTour);

Router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

module.exports = Router;