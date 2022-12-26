const createHttpError = require('http-errors');
const { Book } = require('../database/models');

exports.getBooks = async () => {
  try {
    const books = await Book.findAll();
    if (books) return { response: books };
    return {
      httpError: createHttpError(404, '[Error getting Books] - [Book - GET]: [Books Not Found]'),
    };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error getting Books] - [Book - GET]: [Server error] ${error.message}`),
    };
  }
};

exports.getBookById = async (req) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    if (!book) {
      return {
        httpError: createHttpError(404, '[Error getting Book] - [Book - GET]: [BookId Not Found]'),
      };
    }
    return { response: book.dataValues };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error getting Book] - [Book - GET]: [Server error] ${error.message}`),
    };
  }
};

exports.getBookByTitle = async (req) => {
  try {
    const book = await Book.findOne({ where: { title: req.params.title } });
    if (!book) {
      return {
        httpError: createHttpError(404, '[Error getting Book] - [Book - GET]: [Title Not Found]'),
      };
    }
    return { response: book.dataValues };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error getting Book] - [Book - GET]: [Server error] ${error.message}`),
    };
  }
};

exports.getBookByAuthor = async (req) => {
  try {
    const books = await Book.findAll({ where: { author: req.params.author } });
    if (books.length === 0) {
      return {
        httpError: createHttpError(404, '[Error getting Books] - [Book - GET]: [Author Not Found]'),
      };
    }
    return { response: books };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error getting Books] - [Book - GET]: [Server error] ${error.message}`),
    };
  }
};

exports.postBook = async (req) => {
  try {
    const foundBook = await Book.findOne({ where: { title: req.body.title } });
    if (foundBook) {
      return {
        httpError: createHttpError(409, '[Error creating Book] - [Book - POST]: [This title already exists]'),
      };
    }
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      chapters: req.body.chapters,
      editorial: req.body.editorial,
      year: req.body.year,
    });
    return { response: book };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error creating Book] - [Book - POST]: [Server error] ${error.message}`),
    };
  }
};

exports.putBook = async (req) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    if (!book) {
      return {
        httpError: createHttpError(404, '[Error updating Book] - [Book - PUT]: [BookId Not Found]'),
      };
    }
    await book.update({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      chapters: req.body.chapters,
      editorial: req.body.editorial,
      year: req.body.year,
    });
    return { response: book };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error updating Book] - [Book - PUT]: [Server error] ${error.message}`),
    };
  }
};

exports.deleteBook = async (id) => {
  try {
    if (await Book.destroy({ where: { id } })) {
      return { response: '' };
    }
    return {
      httpError: createHttpError(404, '[Error deleting Book] - [Book - DELETE]: [BookId Not Found]'),
    };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error deleting Book] - [Book - DELETE]: [Server error] ${error.message}`),
    };
  }
};
