const { Book } = require('../database/models');

exports.getBooks = async (res) => {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    return res.status(500);
  }
};

exports.getBookById = async (id,res) => {
  try {
    const book = await Book.findOne({ where: { id: id } });
    return book;
  } catch (error) {
    return res.status(404).json({ message: 'Book not found'});
  }
};

exports.getBookByName = async (name,res) => {
  try {
    const book = await Book.findOne({ where: { name: name } });
    return book;
  } catch (error) {
    return res.status(404).json({ message: 'Book not found'});
  }
};

exports.getBookByAuthor = async (author,res) => {
  try {
    const books = await Book.findAll({ where: { author: author } });
    if(books) return books;
  } catch (error) {
    res.status(404).json({ message: 'Not found author' });
  }
};

exports.postBook = async (req, res) => {
  try {
    const { name, author } = req.body;
    const book = await Book.create({ name: name, author: author });
    return book;
  } catch (error) {
    return res.status(400);
  }
};

exports.putBook = async (req, res) => {
  try {
    const { name, author } = req.body;
    const book = await Book.update({name: name, author: author}, { where: { id: req.params.id } });
    return book;
  } catch (error) {
    return res.status(404).json({ message: 'Book not found'})
  }
};

exports.deleteBook = async (id, res) => {
  try {
    await Book.destroy({ where: { id: id } });
    return res.status(204);
  } catch (error) {
    return res.status(404).json({ message: 'Book not found' });
  }
};