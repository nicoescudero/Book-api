const jwt = require('jsonwebtoken');
const { ErrorObject } = require('http-errors');

exports.generateToken = async (user) => {
  const data = { userID: user.id };
  const token = await jwt.sign(data, process.env.KEY, { expiresIn: 60 * 60 });
  return token;
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '');
    const response = await jwt.verify(token, process.env.KEY);
    if (response) {
      req.params.userID = response.userID;
      return next();
    }
    throw new ErrorObject('Invalid token', 401);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
