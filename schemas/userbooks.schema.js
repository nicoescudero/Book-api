exports.postSchema = {
  BookId: {
    isInt: {
      if: (value) => value !== '',
      errorMessage: 'BookId must be number',
    },
    notEmpty: {
      bail: true,
      errorMessage: 'BookId must not be empty',
    },
  },
};

exports.deleteSchema = {
  matchId: {
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
