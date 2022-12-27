const createHttpError = require('http-errors');
const { UserBooks } = require('../database/models');

exports.getAllMatchs = async (req) => {
  try {
    const matchs = await UserBooks.findAll({ where: { UserId: req.userID } });
    if (!matchs) {
      return {
        httpError: createHttpError(404, '[Error get user] - [UserBooks - GET]: [Matchs Not Found]'),
      };
    }
    return { response: matchs };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error getting matchs] - [UserBooks- GET]: ${error.message}`),
    };
  }
};

exports.createMatch = async (req) => {
  try {
    const match = await UserBooks.create({ UserId: req.userID, BookId: req.body.BookId });
    return { response: match };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Book match Error] - [UserBooks- POST]: ${error.message}`),
    };
  }
};

exports.deleteMatch = async (req) => {
  try {
    const match = await UserBooks.findOne({ where: { id: req.body.matchId } });
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
