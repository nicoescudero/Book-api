const createHttpError = require('http-errors');

exports.isAdmin = (req, res, next) => {
  try {
    if (req.roleId === 1) return next();
    return createHttpError(403, '[You do not have permission to make the request]');
  } catch (error) {
    return createHttpError(403, `[You do not have permission to make the request] ${error.message}`);
  }
};
