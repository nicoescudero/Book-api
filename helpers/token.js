const jwt = require('jsonwebtoken');

exports.generateToken = async (user) => {
  const data = { userID: user.id };
  const token = await jwt.sign(data, process.env.KEY, { expiresIn: 60 * 60 });
  return token;
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers();
    if (await jwt.verify(token, process.env.KEY)) return next();
    return res.status(401).json({ message: 'Invalid Token' });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token', error });
  }
};
