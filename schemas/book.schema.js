module.exports = {
  name: {
    isString: {
      bail: true,
      errorMessage: 'Name must be string',
    },
    isLength: {
      errorMessage: 'Name should be at least 4 chars long',
      options: { min: 4 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'Name should be in lower case',
    },
  },
  author: {
    isString: {
      bail: true,
      errorMessage: 'Author must be string',
    },
    isLength: {
      errorMessage: 'Author should be at least 2 chars long',
      options: { min: 2 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'Name should be in lower case',
    },
  },
};
