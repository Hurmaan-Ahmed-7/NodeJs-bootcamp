const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorHandler');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
//importing routers to be used as middleware
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//add random global middleware's
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//middlewares for http security
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
}); 
app.use('/api', limiter);
app.use(express.json({ limit: '10kb'}));
app.use(mongoSanitize());
app.use(xss());
app.use(express.static(`${__dirname}/public`));
//add routers as middleware's
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//middleware for handling undefined routes
app.all('*', (req, res, next) => {
  const err = new AppError('cant find route', 404);
  next(err);
});
//global error handling middleware for operational errors - common exit for all routes
app.use(errorHandler);
/////////////////////////////////////

module.exports = app;
