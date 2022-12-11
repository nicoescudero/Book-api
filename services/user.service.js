const bcrypt = require('bcryptjs');
const { ErrorObject } = require('http-errors');
const { User } = require('../database/models');
const { generateToken } = require('../helpers/token');

exports.getUserById = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userID } });
    return user;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.postLogin = async (req) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const descrypted = await bcrypt.compare(req.body.password, user.password);
    if (descrypted) {
      const tokn = await generateToken(user);
      return { token: tokn };
    }
    throw new ErrorObject('Invalid credentials', 401);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.postRegister = async (req) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name, email: req.body.email, password: req.body.password,
    });
    return user;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.putUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userID } });
    if (user) {
      req.body.password = await bcrypt.hashSync(req.body.password, 10);
      await user.update({
        name: req.body.name, email: req.body.email, password: req.body.password,
      });
      return user;
    }
    throw new ErrorObject('Invalid credentials', 401);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.deleteUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userID } });
    if (user) {
      await user.destroy();
      return;
    }
    throw new ErrorObject('User ID Not Found', 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
