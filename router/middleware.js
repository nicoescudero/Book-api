const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if (!req.headers['x-access-token'])
        return res.json({ message: 'You need a token' });

    const userToken = {};
    try {
        userToken = jwt.decode(req.headers['x-access-token'], process.env.KEY);
    } catch (error) {
        res.json({ message: 'The token is invalid' })
    }

    if (userToken.expiredAt < moment.unix())
        return res.json({ message: 'The token has expired' });

    req.userId = userToken.id;

    next();
}

module.exports = { checkToken }