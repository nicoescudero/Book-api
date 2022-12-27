const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { getAllMatchs, createMatch, deleteMatch } = require('../services/userbooks.service');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await getAllMatchs(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Get Matchs OK',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error getting matchs] - [UserBooks- GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await createMatch(req);
      if (!httpError) {
        endpointResponse({
          code: 201,
          res,
          message: 'Match OK',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 401,
        `[Book match error] - [UserBooks- POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await deleteMatch(req);
      if (!httpError) {
        endpointResponse({
          code: 204,
          res,
          message: 'Match Deleted',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error deleting match] - [UserBooks- DELETE]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
