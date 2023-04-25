const express = require('express');
const router = express.Router();
const tourController = require(`./../controllers/tourController`);
authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
//alias router
router
  .route('/top-5-cheap')
  .get(tourController.top5CheapAlias, tourController.getTours)
  .post(tourController.createTour);
//resource routers
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(
    authController.protect,
    authController.restrict('admin', 'lead-guide'),
    tourController.deleteTourById
  );
router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrict('user'),
    reviewController.createReview
  );

module.exports = router;
