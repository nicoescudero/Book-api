const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const {
  getUserById, postLogin, postRegister, putUser, deleteUser,
} = require('../services/user.service');

module.exports = {
  getById: catchAsync(async (req, res, next) => {
    try {
      const response = await getUserById(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Success getting user',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error getting user] - [User - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  login: catchAsync(async (req, res, next) => {
    try {
      const response = await postLogin(req);
      endpointResponse({
        code: 200,
        res,
        message: 'User login successful',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error logging user] - [User - POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  register: catchAsync(async (req, res, next) => {
    try {
      const response = await postRegister(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Registered user',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error registering user] - [User - POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const response = await putUser(req);
      endpointResponse({
        code: 200,
        res,
        message: 'User updated',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating user] - [User - PUT]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteUser(req);
      endpointResponse({
        code: 200,
        res,
        message: 'User deleted',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [User - DELETE]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
