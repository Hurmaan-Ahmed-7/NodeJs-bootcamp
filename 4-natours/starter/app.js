const express = require('express');

const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorHandler');
//importing routers to be used as middleware
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//add random middleware's
app.use(morgan('dev'));
app.use(express.json());
app.use(morgan('dev'));
//add routers as middleware's
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//middleware for handling undefined routes
app.all('*', (req, res, next)=> {
  const err = new AppError('cant find route', 404);
  next(err);
});
//global error handling middleware for operational errors - common exit for all routes
app.use(errorHandler);
/////////////////////////////////////

module.exports = app;
