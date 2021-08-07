const { Router } = require('express');
const route = Router();
const { Book } = require('../configuration/database')

//get all books
route.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.json({ Succes: books })
});

//get book by id 
route.get('/:bookId', async (req, res) => {
    const book = await Book.findOne({ where: { id: req.params.bookId } });
    res.json({ Succes: book });
})

//get book by name
route.get('/name/:bookName', async (req, res) => {
    const book = await Book.findOne({ where: { name: req.params.bookName } });
    res.json({ Succes: book });
})

//get book by author
route.get('/author/:bookAuthor', async (req, res) => {
    const book = await Book.findOne({ where: { author: req.params.bookAuthor } });
    res.json({ Succes: book });
})

//post book
route.post('/', async (req, res) => {
    const newBook = await Book.create(req.body);
    res.json({ Succes: newBook })
});

//delete book by id
route.delete('/:bookId', async (req, res) => {
    await Book.destroy({ where: { id: req.params.bookId } })
    res.json({ Succes: 'Deleted' });
})

//update by id
route.put('/:bookId', async (req, res) => {
    await Book.update(req.body, { where: { id: req.params.bookId } })
    res.json({ Succes: 'Updated Book' });
})

module.exports = route;