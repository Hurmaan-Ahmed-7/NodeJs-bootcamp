const express = require('express');
const Router = express.Router();
const controller = require(`./../controllers/userController`);
Router.route('/').get(controller.getTourUsers).post(controller.createTourUsers);

Router.route('/:id')
  .get(controller.getUserById)
  .patch(controller.updateUserById)
  .delete(controller.deleteUserById);

module.exports = Router;
