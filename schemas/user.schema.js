module.exports = {
  name: {
    isString: {
      bail: true,
      errorMessage: 'Name is wrong',
    },
    isLength: {
      errorMessage: 'Name should be at least 2 chars long',
      options: { min: 2 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'Name should be in lower case',
    },
  },
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Invalid Email',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  },
};
