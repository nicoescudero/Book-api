const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const {
  getUser, getUserById, postLogin, postRegister, putUser, deleteUser,
} = require('../services/user.service');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getUser();
      endpointResponse({
        code: 200,
        res,
        message: 'Get users Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving User] - [User - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getById: catchAsync(async (req, res, next) => {
    try {
      const response = await getUserById(req.params.id);
      endpointResponse({
        code: 200,
        res,
        message: 'Get user Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving User] - [User - GET]: ${error.message}`,
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
        message: 'User logged Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error login User] - [User - POST]: ${error.message}`,
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
        message: 'User register Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error SignUp] - [User - POST]: ${error.message}`,
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
        message: 'User updated Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating User] - [User - PUT]: ${error.message}`,
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
        message: 'User deleted Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting User] - [User - DELETE]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
