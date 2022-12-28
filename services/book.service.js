const createHttpError = require('http-errors');
const { Book } = require('../database/models');

exports.getBooks = async (req) => {
  try {
    const getUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const page = Number.parseInt(req.query.page, 10) || 1;
    const info = { next: null, prev: null };
    const limit = 10;
    const offset = page > 0 ? (page - 1) * limit : 0;

    if (page) {
      if (page > 1) {
        info.prev = `${getUrl}?page=${Number(page) - 1}`;
        info.next = `${getUrl}?page=${Number(page) + 1}`;
      } else {
        info.prev = null;
        info.next = `${getUrl}?page=${Number(page) + 1}`;
      }
    } else {
      info.prev = null;
      info.next = `${getUrl}?page=2`;
    }
    const { count, rows: books } = await Book.findAndCountAll({ offset, limit });
    const totalPages = Math.ceil(count / limit);
    if (totalPages < page || page === 0) {
      return {
        httpError: createHttpError(404, '[Error getting Books] - [Book - GET]: [Books Not Found]'),
      };
    }
    const allBooks = {
      prev: info.prev,
      next: `${totalPages > page ? info.next : null}`,
      currentPage: page,
      totalPages,
      books,
    };
    return { response: allBooks };
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
    const getUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const page = Number.parseInt(req.query.page, 10) || 1;
    const info = { next: null, prev: null };
    const limit = 10;
    const offset = page > 0 ? (page - 1) * limit : 0;

    if (page) {
      if (page > 1) {
        info.prev = `${getUrl}?page=${Number(page) - 1}`;
        info.next = `${getUrl}?page=${Number(page) + 1}`;
      } else {
        info.prev = null;
        info.next = `${getUrl}?page=${Number(page) + 1}`;
      }
    } else {
      info.prev = null;
      info.next = `${getUrl}?page=2`;
    }
    const { count, rows: books } = await Book.findAndCountAll({
      where: { author: req.params.author },
      offset,
      limit,
    });
    const totalPages = Math.ceil(count / limit);
    if (totalPages < page || page === 0) {
      return {
        httpError: createHttpError(404, '[Error getting Books] - [Book - GET]: [Author Not Found]'),
      };
    }
    const allBooks = {
      prev: info.prev,
      next: `${totalPages > page ? info.next : null}`,
      currentPage: page,
      totalPages,
      books,
    };
    return { response: allBooks };
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
    const titlesFound = await Book.findAll({ where: { title: req.body.title } });
    const titleExist = await titlesFound.filter((e) => e.id !== book.id);
    if (titleExist.length > 0) {
      return {
        httpError: createHttpError(409, '[Error updating Book] - [Book - PUT]: [This title already exists]'),
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
