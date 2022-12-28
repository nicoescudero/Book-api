exports.bookSchema = {
  title: {
    isString: {
      bail: true,
      errorMessage: 'title must be string',
    },
    isLength: {
      errorMessage: 'title should be at least 4 chars long',
      options: { min: 4 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'title should be in lower case',
    },
  },
  author: {
    isString: {
      bail: true,
      errorMessage: 'author must be string',
    },
    isLength: {
      errorMessage: 'author should be at least 2 chars long',
      options: { min: 2 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'author should be in lower case',
    },
  },
  description: {
    isString: {
      bail: true,
      errorMessage: 'description must be string',
    },
    isLength: {
      errorMessage: 'description should be at least 20 chars long',
      options: { min: 20 },
    },
  },
  chapters: {
    isInt: {
      if: (value) => value !== '',
      errorMessage: 'chapters must be number',
    },
    notEmpty: {
      bail: true,
      errorMessage: 'chapters must not be empty',
    },
  },
  editorial: {
    isString: {
      bail: true,
      errorMessage: 'editorial must be string',
    },
    isLength: {
      errorMessage: 'editorial should be at least 2 chars long',
      options: { min: 2 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'editorial should be in lower case',
    },
  },
  year: {
    isInt: {
      if: (value) => value !== '',
      errorMessage: 'year must be number',
    },
    notEmpty: {
      bail: true,
      errorMessage: 'year must not be empty',
    },
  },
};

exports.idSchema = {
  id: {
    in: ['params', 'query'],
    isInt: {
      if: (value) => value !== '',
      errorMessage: 'id must be number',
    },
    toInt: true,
    notEmpty: {
      bail: true,
      errorMessage: 'id must not be empty',
    },
  },
};

exports.authorSchema = {
  author: {
    in: ['params', 'query'],
    isString: {
      bail: true,
      errorMessage: 'author must be string',
    },
    isLength: {
      errorMessage: 'author should be at least 2 chars long',
      options: { min: 2 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'author should be in lower case',
    },
  },
};

exports.titleSchema = {
  title: {
    in: ['params', 'query'],
    isString: {
      bail: true,
      errorMessage: 'title must be string',
    },
    isLength: {
      errorMessage: 'title should be at least 4 chars long',
      options: { min: 4 },
    },
    isUppercase: {
      negated: true,
      errorMessage: 'titler should be in lower case',
    },
  },
};
