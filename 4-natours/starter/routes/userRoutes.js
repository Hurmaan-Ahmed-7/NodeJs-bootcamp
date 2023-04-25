const express = require('express');
const router = express.Router();
const userController = require(`./../controllers/userController`);
const authController = require(`./../controllers/authController`);

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:token').patch(authController.resetPassword);
router
  .route('/update-password')
  .patch(authController.protect, authController.updatePassword);
router
  .route('/update-me')
  .patch(authController.protect, userController.updateMe);
router
  .route('/delete-me')
  .delete(authController.protect, userController.deleteMe);
router
  .route('/')
  .get(authController.protect, userController.getTourUsers)
  .post(userController.createTourUsers);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
