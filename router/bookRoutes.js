const { Router } = require('express');
const route = Router();
const { Book } = require('../configuration/database')
const { check, validationResult } = require('express-validator');

route.get('/', async (req, res) => {
    const books = await Book.findAll();
    (books) ?
        res.json({ Succes: books }) :
        res.status(404).json({ message: 'Books not found' })

});

route.get('/:bookId', async (req, res) => {
    const book = await Book.findOne({ where: { id: req.params.bookId } });
    (book) ?
        res.json({ Succes: book }) :
        res.status(404).json({ message: 'Book not found' });
})

route.get('/name/:bookName', async (req, res) => {
    const book = await Book.findOne({ where: { name: req.params.bookName } });
    (book) ?
        res.json({ Succes: book }) :
        res.status(404).json({ message: 'Book not found' });
})

route.get('/author/:bookAuthor', async (req, res) => {
    const books = await Book.findAll({ where: { author: req.params.bookAuthor } });
    (books) ?
        res.json({ Succes: books }) :
        res.status(404).json({ message: 'Not found author' });
})

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

route.delete('/:bookId', async (req, res) => {
    const book = await Book.findOne({ where: { id: req.params.bookId } });
    if (book) {
        await Book.destroy({ where: { id: req.params.bookId } })
        res.json({ Succes: 'Deleted' });
    } else
        res.status(404).json({ message: 'Book not found' });
})


module.exports = route;