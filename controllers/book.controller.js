const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const {
  getBooks, getBookById, getBookByTitle, getBookByAuthor, postBook, putBook, deleteBook,
} = require('../services/book.service');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await getBooks(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Get Books Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error getting Books] - [Book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getById: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await getBookById(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Get Book Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error getting Book] - [Book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getByTitle: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await getBookByTitle(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Get Book Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error getting Book] - [Book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getByAuthor: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await getBookByAuthor(req);
      if (!httpError) {
        endpointResponse({
          code: 200,
          res,
          message: 'Get Book Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error getting Books] - [Book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await postBook(req, res);
      if (!httpError) {
        endpointResponse({
          code: 201,
          res,
          message: 'Post Book Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error creating Book] - [Book - POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await putBook(req, res);
      if (!httpError) {
        endpointResponse({
          code: 204,
          res,
          message: 'Update Book Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error updating Book] - [Book - PUT]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const { response, httpError } = await deleteBook(req.params.id);
      if (!httpError) {
        endpointResponse({
          code: 204,
          res,
          message: 'Delete Book Succesfuly',
          body: response,
        });
      }
      next(httpError);
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error deleting Book] - [Book - DELETE]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
