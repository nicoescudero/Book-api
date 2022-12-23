const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const {
  getUserById, postLogin, postRegister, putUser, deleteUser,
} = require('../services/user.service');

module.exports = {
  getById: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await getUserById(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Success getting user',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error getting user] - [User - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  login: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await postLogin(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'User login successful',
          body: { token: response },
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error logging user] - [User - POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  register: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await postRegister(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Registered user',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error registering user] - [User - POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await putUser(req);
      if (!httpError) {
        endpointResponse({
          code: 204,
          res,
          message: 'User updated',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error updating user] - [User - PUT]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await deleteUser(req);
      if (!httpError) {
        endpointResponse({
          code: 204,
          res,
          message: 'User deleted',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error deleting user] - [User - DELETE]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
