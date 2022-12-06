const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment');

exports.getUser = async () => {
    const users = await User.findAll();
    return users;
};

exports.getUserById = async (id) => {
  const user = await User.findOne({ where: { id: id } });
  return user;
};

exports.postLogin = async (req) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  const descrypted = bcrypt.compareSync(req.body.password, user.password);
  return await generateToken(user);
};

exports.postRegister = async (req) => {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    return user;
  };

exports.putUser = async (req) => {
  const usuario = await User.findOne({ where: { id: req.params.userId } })
  if (usuario) {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    const user = usuario.update(req.body);
    return user;
  }
};

exports.deleteUser = async (req) => {
  const usuario = await User.findOne({ where: { id: req.params.userId } });
  usuario.destroy();
  return ;
};

const generateToken = (user) => {
  const data = {
      userID: user.id,
      createdAt: moment().unix(),
      expiredAt: moment().add(5, 'minutes').unix()
  }
  return jwt.encode(data, process.env.KEY);
};
