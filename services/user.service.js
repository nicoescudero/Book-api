const bcrypt = require('bcryptjs');
const { User } = require('../database/models');
const { generateToken } = require('../helpers/token');

exports.getUser = async () => {
  const users = await User.findAll();
  return users;
};

exports.getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

exports.postLogin = async (req) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  const descrypted = bcrypt.compareSync(req.body.password, user.password);
  if (descrypted) {
    const token = await generateToken(user);
    return token;
  }
  return { message: 'Invalid password' };
};

exports.postRegister = async (req) => {
  req.body.password = await bcrypt.hashSync(req.body.password, 10);
  const user = await User.create(req.body);
  return user;
};

exports.putUser = async (req) => {
  const usuario = await User.findOne({ where: { id: req.params.userId } });
  if (usuario) {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    const user = usuario.update(req.body);
    return user;
  }
  return { message: 'User not found' };
};

exports.deleteUser = async (req) => {
  const usuario = await User.findOne({ where: { id: req.params.userId } });
  usuario.destroy();
};
