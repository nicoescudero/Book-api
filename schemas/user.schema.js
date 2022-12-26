exports.registerSchema = {
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
    normalizeEmail: {
      bail: true,
    },
    notEmpty: {
      bail: true,
      errorMessage: 'email must not be empty',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  },
};

exports.loginSchema = {
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Invalid Email',
    },
    notEmpty: {
      bail: true,
      errorMessage: 'email must not be empty',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  },
};

exports.putSchema = {
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
    normalizeEmail: {
      bail: true,
    },
    notEmpty: {
      bail: true,
      errorMessage: 'email must not be empty',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  },
  newPassword: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  },
};
