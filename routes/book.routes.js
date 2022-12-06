const routes = require('express').Router();
const {
  get, getById, getByName, getByAuthor, post, put, destroy,
} = require('../controllers/book.controller');

routes.get('/', get);
routes.get('/:id', getById);
routes.get('/name/:name', getByName);
routes.get('/author/:author', getByAuthor);
routes.post('/', post);
routes.put('/:id', put);
routes.delete('/:id', destroy);

module.exports = routes;
