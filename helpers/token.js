const jwt = require('jsonwebtoken');

exports.generateToken = async (user) => {
  const data = { userID: user.id };
  return await jwt.sign(data, process.env.KEY, { expiresIn: 60*60 });
};

exports.verifyToken = async (req,res,next) => {
  try {
    const token = req.headers();
    if(await jwt.verify(token,process.env.KEY)) next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token', error});
  }
};
