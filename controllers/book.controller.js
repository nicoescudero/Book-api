const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getBooks, getBookById, getBookByName, getBookByAuthor, postBook, putBook, deleteBook } = require('../services/book.service');

module.exports = {
  get: catchAsync(async (req,res,next) => {
    try {
      const response = await getBooks();
      endpointResponse({
        code: 200,
        res,
        message: 'Get Books Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving Book] - [book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getById: catchAsync(async (req,res,next) => {
    try {
      const response = await getBookById(req.params.id);
      endpointResponse({
        code: 200,
        res,
        message: 'Get Book Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving Book] - [book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getByName: catchAsync(async (req, res, next) => {
    try {
      const response = getBookByName(req.params.name);
      endpointResponse({
        code: 200,
        res,
        message: 'Get Book Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving Book] - [book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  getByAuthor: catchAsync(async (req,res,next) => {
    try {
      const response = await getBookByAuthor(req.params.author);
      endpointResponse({
        code: 200,
        res,
        message: 'Get Book Succesfuly',
        body: response,
      });  
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving Book] - [book - GET]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  post: catchAsync(async (req,res,next) => {
    try {
      const response = await postBook(req,res);
      endpointResponse({
        code: 201,
        res,
        message: 'Post Book Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error post Book] - [book - POST]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const response = await putBook(req, res);
      endpointResponse({
        code: 200,
        res,
        message: 'Update Book Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating Book] - [book - PUT]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteBook(req.params.id);
      endpointResponse({
        code: 204,
        res,
        message: 'Delete Book Succesfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Book] - [book - DELETE]: ${error.message}`,
      );
      next(httpError);
    }
  }),
}
