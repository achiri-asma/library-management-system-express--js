const express = require('express');

const routerrrr = express.Router();

const borrowBook = require('../../controllers/borrowBooks/borrowBook');

const returnBook = require('../../controllers/borrowBooks/returnBook');

const checkBorrowedBooks = require('../../controllers/borrowBooks/checkBorrowedBook');


routerrrr.post('/borrowBook',borrowBook);

routerrrr.put('/returnBook',returnBook);

routerrrr.get('/getBorrowedBooks', checkBorrowedBooks);








module.exports = routerrrr;
