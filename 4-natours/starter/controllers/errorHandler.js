const AppError = require('../utils/appError');

const JsonWebTokenError = (err) => {
  console.log('ja');
  
  const message = 'Invalid token. Please login again';
  return new AppError(message, 401);
};
const TokenExpiredError = (err) => {
  const message = 'Your token has expired. Please login again';
  return new AppError(message, 401);
};
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorprod = (err, res) => {
  //operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //programming errors or unhandled errors
  else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
//in dev, we dont have to format the operational errors
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
//in prod, we have to format the operational errors
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = JsonWebTokenError(error);
    }
    if (err.name === 'TokenExpiredError') {
      error = TokenExpiredError(error);
    }

    sendErrorprod(error, res);
  }
};
