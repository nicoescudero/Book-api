const createHttpError = require('http-errors');
const { UserBooks } = require('../database/models');

exports.getAllMatchs = async (req) => {
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

    const { count, rows: matchs } = await UserBooks.findAndCountAll({
      where: { UserId: req.userID },
      offset,
      limit,
    });
    const totalPages = Math.ceil(count / limit);
    if (totalPages < page || page === 0) {
      return {
        httpError: createHttpError(404, '[Error get user] - [UserBooks - GET]: [Matchs Not Found]'),
      };
    }
    const allMatchs = {
      prev: info.prev,
      next: `${totalPages > page ? info.next : null}`,
      currentPage: page,
      totalPages,
      matchs,
    };
    return { response: allMatchs };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error getting matchs] - [UserBooks- GET]: ${error.message}`),
    };
  }
};

exports.createMatch = async (req) => {
  try {
    const match = await UserBooks.create({ UserId: req.userID, BookId: req.params.bookId });
    return { response: match };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Book match Error] - [UserBooks- POST]: ${error.message}`),
    };
  }
};

exports.deleteMatch = async (req) => {
  try {
    const match = await UserBooks.findOne({ where: { id: req.params.matchId } });
    if (!match) {
      return {
        httpError: createHttpError(404, '[Error deleting match] - [UserBooks- DELETE]: [Match Not Found]'),
      };
    }
    if (match.UserId === req.userID) {
      match.destroy();
      return { response: '' };
    }
    return {
      httpError: createHttpError(404, '[Error deleting match] - [UserBooks- DELETE]: [Match Not Found]'),
    };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error deleting match] - [UserBooks- DELETE]: ${error.message}`),
    };
  }
};
