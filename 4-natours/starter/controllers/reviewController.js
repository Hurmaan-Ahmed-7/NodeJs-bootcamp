const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Review = require('./../models/reviewModel');

const getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();
    if (!reviews) {
        return next(new AppError('No reviews yet!', 404));
    }
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        requestedAt: req.requestTime,
        data: {
            reviews
        }
    });
});

const createReview = catchAsync(async (req, res, next) => {
    console.log('req.body: ', req.body);
    
    //Allow nested routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    console.log(req.params, req.body.tour, req.body.user);
    
    const newReview = await Review.create(req.body);
    if (!newReview) {
        return next(new AppError('No review found with that ID', 404));
    }
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

module.exports = {
    getAllReviews,
    createReview
};