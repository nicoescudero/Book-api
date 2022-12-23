const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

exports.generateToken = async (user) => {
  const data = { userID: user.id, roleId: user.roleId };
  const token = await jwt.sign(data, process.env.KEY, { expiresIn: 60 * 60 });
  return token;
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '');
    const response = await jwt.verify(token, process.env.KEY);
    if (response) {
      req.params.userID = response.userID;
      req.params.roleId = response.roleId;
      return next();
    }
    return next(createHttpError(401, 'Invalid token'));
  } catch (error) {
    return next(createHttpError(401, 'Missing token'));
  }
};
