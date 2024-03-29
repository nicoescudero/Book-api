const { validationResult } = require('express-validator');

exports.handleValidator = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    return res.status(422).json({ errors: error.array() });
  }
};
