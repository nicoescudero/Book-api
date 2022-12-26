const routes = require('express').Router();
const { isAdmin } = require('../middlewares/roleValidator');
const { validateSchema } = require('../middlewares/validator');
const { bookSchema } = require('../schemas/book.schema');
const {
  get, getById, getByTitle, getByAuthor, post, put, destroy,
} = require('../controllers/book.controller');

routes.get('/', isAdmin, get);
routes.get('/:id', getById);
routes.get('/title/:title', getByTitle);
routes.get('/author/:author', getByAuthor);
routes.post('/', isAdmin, validateSchema(bookSchema), post);
routes.put('/:id', isAdmin, validateSchema(bookSchema), put);
routes.delete('/:id', isAdmin, destroy);

module.exports = routes;
