const routes = require('express').Router();
const { validateSchema } = require('../middlewares/validator');
const { postSchema, deleteSchema } = require('../schemas/userbooks.schema');
const { get, post, destroy } = require('../controllers/userbooks.controller');

routes.get('/', get);
routes.post('/', validateSchema(postSchema), post);
routes.delete('/', validateSchema(deleteSchema), destroy);

module.exports = routes;
