const routes = require('express').Router();
const { isAdmin } = require('../middlewares/roleValidator');
const { validateSchema } = require('../middlewares/validator');
const {
  bookSchema, idSchema, titleSchema, authorSchema,
} = require('../schemas/book.schema');
const {
  get, getById, getByTitle, getByAuthor, post, put, destroy,
} = require('../controllers/book.controller');

routes.get('/', get);
routes.get('/:id', validateSchema(idSchema), getById);
routes.get('/title/:title', validateSchema(titleSchema), getByTitle);
routes.get('/author/:author', validateSchema(authorSchema), getByAuthor);
routes.post('/', isAdmin, validateSchema(bookSchema), post);
routes.put('/:id', isAdmin, validateSchema(bookSchema), put);
routes.delete('/:id', isAdmin, validateSchema(idSchema), destroy);

module.exports = routes;
