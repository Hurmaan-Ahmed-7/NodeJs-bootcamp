const express = require('express');
const Router = express.Router();
const tourController = require(`./../controllers/tourController`);

//alias router
Router
  .route('/top-5-cheap')
  .get(tourController.top5CheapAlias ,tourController.getTours)
  .post(tourController.createTour);
//resource routers
Router
  .route('/tour-stats')
  .get(tourController.getTourStats);
Router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);
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