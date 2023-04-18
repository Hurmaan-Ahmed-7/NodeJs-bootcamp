const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');

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
};
