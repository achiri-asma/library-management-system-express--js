const express = require('express');

const routerr = express.Router();

const upload = require('../../config/multerConfig');

const addBook = require('../../controllers/book/addBook');

const  getAllBooks  = require('../../controllers/book/getAllBooks');

const  updateBook  = require('../../controllers/book/updateBook');

const  deleteBook  = require('../../controllers/book/deleteBook');

const  searchBooks  = require('../../controllers/book/searchBooks');

const  getAllBooksWithAuthors  = require('../../controllers/book/getAllBooksWithAuthor');

routerr.post('/addBook',upload.single('image'),addBook);

routerr.get('/getAllBooks', getAllBooks);

routerr.put('/updateBook/:id', upload.single('image'), updateBook);

routerr.delete('/deleteBook/:id', deleteBook);

routerr.get('/searchBook/:query', searchBooks);

routerr.get('/booksWithAuthors', getAllBooksWithAuthors);









module.exports = routerr;
