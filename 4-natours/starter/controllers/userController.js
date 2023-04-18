const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password',
        400
      )
    );
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filterObj(req.body, 'name', 'email'),
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});
const deleteMe = catchAsync(async (req, res, next) => {
  console.log(req.user);
  
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
const getTourUsers = catchAsync(
  async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: 'users.length',
      data: {
        users
      }  
    });
});
const getUserById = catchAsync(
  async (req, res, next) => {
    const users = await User.findById(req.params.id);
  }
);
const createTourUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not supported yet',
  });
};
const updateUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not supported yet',
  });
};
const deleteUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not supported yet',
  });
};
module.exports = {
  getUserById,
  getTourUsers,
  createTourUsers,
  updateUserById,
  deleteUserById,
  updateMe,
  deleteMe
};
