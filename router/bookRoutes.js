const { Router } = require('express');
const route = Router();
const { Book } = require('../configuration/database')
const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   authToken:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schemas:
 *   Book:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: id generated automatically
 *     name:
 *      type: string
 *      description: name of book
 *     author:
 *      type: string
 *      description: name of the book's author
 *    example:
 *      id: 1
 *      title: "Don Quijote de la Mancha"
 *      author: "Miguel de Cervantes"
 *   BookRequirements:
 *    type: object
 *    example:
 *      name: ""
 *      author: ""
 *  parameters:
 *   bookId:
 *    in: path
 *    name: bookId
 *    required: true
 *    description: id of book
 *    schema:
 *     type: integer
 *     example: 9
 *   bookName:
 *    in: path
 *    name: bookName
 *    required: true
 *    description: name of the book
 *    schema:
 *     type: string
 *   bookAuthor:
 *    in: path
 *    name: bookAuthor
 *    required: true
 *    description: name of the author
 *    schema:
 *     type: string"
 *  responses:
 *   200:
 *    description: Succes Operation
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/Book"
 *   404:
 *    description: Not found books
 *    content:
 *     application/json:
 *      schema:
 *         $ref: "#components/schemas/Book"
 *   401:
 *    description: Unauthorized Error
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *        example:    
 *         message: Token not provided
 * tags:
 *  name: Book
 *  description: Book Data, you need a token
 */

/**
 * @swagger
 * /book:
 *  get:
 *   security:
 *    - authToken: []
 *   summary: Get list of books
 *   tags: [Book]
 *   responses:
 *    $ref: "#components/responses"
 */
route.get('/', async (req, res) => {
    const books = await Book.findAll();
    (books) ?
        res.json({ Succes: books }) :
        res.status(404).json({ message: 'Books not found' })

});
/**
 * @swagger
 * /book/{bookId}:
 *  get:
 *   summary: Get a book by Id
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   security:
 *    - authToken: []
 *   responses:
 *    $ref: "#components/responses"
 */
route.get('/:bookId', async (req, res) => {
    const book = await Book.findOne({ where: { id: req.params.bookId } });
    (book) ?
        res.json({ Succes: book }) :
        res.status(404).json({ message: 'Book not found' });
})

/**
 * @swagger
 * /book/name/{bookName}:
 *  get:
 *   summary: Get a book by Name
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/bookName"
 *   security:
 *    - authToken: []
 *   responses:
 *    $ref: "#components/responses"
 */
route.get('/name/:bookName', async (req, res) => {
    const book = await Book.findOne({ where: { name: req.params.bookName } });
    (book) ?
        res.json({ Succes: book }) :
        res.status(404).json({ message: 'Book not found' });
})

/**
 * @swagger
 * /book/author/{bookAuthor}:
 *  get:
 *   summary: Get books by name of the author
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/bookAuthor"
 *   security:
 *    - authToken: []
 *   responses:
 *    $ref: "#components/responses"
 */

route.get('/author/:bookAuthor', async (req, res) => {
    const books = await Book.findAll({ where: { author: req.params.bookAuthor } });
    (books) ?
        res.json({ Succes: books }) :
        res.status(404).json({ message: 'Not found author' });
})

/**
 * @swagger
 * /book/:
 *  post:
 *   summary: Add a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/BookRequirements"
 *   responses:
 *    201:
 *      description: Added book
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         example:
 *          message: Added book
 *    400:
 *     description: message when some aspect of the request is invalid
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#components/schemas/InvalidRequest"
 *    401:
 *     description: Unauthorized Error
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *           message:
 *            type: string
 *         example:
 *           message: Token not provided
 *    422:
 *      description: Unprocessable Entity
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *          example:
 *           message: Undocumented
 */
route.post('/', [
    check('name', ' Name of book is required').notEmpty(),
    check('author', 'Name of author is required').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if (Object.keys(req.body).length < 3) {
        const newBook = await Book.create(req.body);
        res.status(201).json({ Succes: 'Added Book', book: newBook })
    } else
        res.status(400).json({ message: 'Error, Invalid Request' })

});

/**
 *  @swagger
 * /book/{bookId}:
 *  put:
 *   summary: Update a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/BookRequirements"
 *   responses:
 *    201:
 *      description: Updated book
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         example:
 *          message: Updated book
 *    400:
 *     description: message when some aspect of the request is invalid
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#components/schemas/InvalidRequest"
 *    401:
 *     description: Unauthorized Error
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *           message:
 *            type: string
 *         example:
 *           message: Token not provided
 *    422:
 *      description: Unprocessable Entity
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *          example:
 *           message: Undocumented
 */
route.put('/:bookId', [
    check('name', ' Name of book is required').notEmpty(),
    check('author', 'Name of author is required').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if (Object.keys(req.body).length < 3) {
        await Book.update(req.body, { where: { id: req.params.bookId } })
        res.status(201).json({ Succes: 'Updated Book' });
    } else
        res.status(400).json({ message: 'Error, Invalid Request' })
})

/**
 * @swagger
 * /book/{bookId}:
 *  delete:
 *   summary: Delete a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   responses:
 *    200:
 *      description:
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          example:
 *           message: Book deleted
 *    401:
 *       description: Unauthorized Error
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *           example:
 *            message: Token not provided
 *    404:
 *      description: Book not found
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *        example:
 *         message: Book not found  
 */
route.delete('/:bookId', async (req, res) => {
    const book = await Book.findOne({ where: { id: req.params.bookId } });
    if (book) {
        await Book.destroy({ where: { id: req.params.bookId } })
        res.json({ Succes: 'Deleted' });
    } else
        res.status(404).json({ message: 'Book not found' });
})


module.exports = route;