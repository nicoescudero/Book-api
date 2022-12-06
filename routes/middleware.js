const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = async (req, res, next) => {
    const authHeader = req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    var userToken = {};
    if (token === null)
        return res.status(401).json({ message: 'Need a token' });
    try {
        userToken = await jwt.decode(token, process.env.KEY);
    } catch (error) {
        return res.status(401).json({ message: 'The token is invalid' })
    }
    if (userToken.expiredAt < moment.unix())
        return res.status(401).json({ message: 'The token has expired' });
    req.userId = userToken.id;
    next();
}

module.exports = { checkToken }