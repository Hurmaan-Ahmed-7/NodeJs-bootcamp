const express = require('express');

const app = express();
const morgan = require('morgan');

//importing routers to be used as middleware
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//adding random middleware's
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  //console.log('Hello from the middleware 👋');
  next();
});
app.use(morgan('dev'));
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });
//routers used to define express object used as middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//handle undefined routes
app.all('*', (req, res, next)=> {
  res
  .status(404)
  .json({
    status: 'fail',
    message: `can not find route`
  })
});
/////////////////////////////////////

module.exports = app;
