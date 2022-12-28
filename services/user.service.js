const bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');
const { User } = require('../database/models');
const { generateToken } = require('../helpers/token');

exports.getUserById = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.userID } });
    if (user) return { response: user };
    return { httpError: createHttpError(404, '[Error get user] - [User - GET]: [UserId Not Found]') };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error get user] - [User - GET]: [Server error] ${error.message}`),
    };
  }
};

exports.postLogin = async (req) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return { httpError: createHttpError(404, '[Error logging user] - [User - POST]: [User Not found]') };
    const descrypted = await bcrypt.compare(req.body.password, user.password);
    if (descrypted) {
      const response = await generateToken(user);
      return { response };
    }
    return { httpError: createHttpError(401, '[Error logging user] - [User - POST]: [Invalid Credentials]') };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error logging user] - [User - POST]: [Server error] ${error.message}`),
    };
  }
};

exports.postRegister = async (req) => {
  try {
    const userFound = await User.findOne({ where: { email: req.body.email } });
    if (userFound) {
      return { httpError: createHttpError(409, '[Error register User] - [User - POST]: [This email already exists]') };
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name, email: req.body.email, password: req.body.password, roleId: 2,
    });
    return { response: user };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error register user] - [User - POST]: [Server error] ${error.message}`),
    };
  }
};

exports.putUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.userID } });
    if (!user) {
      return { httpError: createHttpError(404, '[Error updating user] - [User - PUT]: [UserId Not Found]') };
    }
    const emailsFound = await User.findAll({ where: { email: req.body.email } });
    const emailExist = await emailsFound.filter((item) => item.id !== req.userID);
    if (emailExist.length > 0) {
      return { httpError: createHttpError(409, '[Error updating User] - [User - PUT]: [This email already exists]') };
    }
    const compare = await bcrypt.compare(req.body.password, user.dataValues.password);
    if (!compare) {
      return { httpError: createHttpError(401, '[Error updating user] - [User - PUT]: [passwords do not match]') };
    }
    req.body.newPassword = await bcrypt.hashSync(req.body.newPassword, 10);
    await user.update({
      name: req.body.name, email: req.body.email, password: req.body.newPassword,
    });
    return { reponse: user };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error updating user] - [User - PUT]: [Server error] ${error.message}`),
    };
  }
};

exports.deleteUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.userID } });
    if (user) {
      await user.destroy();
      return { response: '' };
    }
    return { httpError: createHttpError(404, '[Error deleting user] - [User - DELETE]: [UserId Not Found]') };
  } catch (error) {
    return {
      httpError: createHttpError(500, `[Error deleting user] - [User - DELETE]: [Server error] ${error.message}`),
    };
  }
};
