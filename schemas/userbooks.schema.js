exports.postSchema = {
  bookId: {
    in: ['params', 'query'],
    isInt: {
      if: (value) => value !== '',
      errorMessage: 'bookId must be number',
    },
    toInt: true,
    notEmpty: {
      bail: true,
      errorMessage: 'bookId must not be empty',
    },
  },
};

exports.deleteSchema = {
  matchId: {
    in: ['params', 'query'],
    isInt: {
      if: (value) => value !== '',
      errorMessage: 'matchId must be number',
    },
    notEmpty: {
      bail: true,
      errorMessage: 'matchId must not be empty',
    },
  },
};
