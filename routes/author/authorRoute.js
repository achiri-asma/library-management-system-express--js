const express = require('express');

const routerrr = express.Router();

const addAuthor = require('../../controllers/author/addAuthor');

const updateAuthor = require('../../controllers/author/updateAuthor');

const deleteAuthor = require('../../controllers/author/deleteAuthor');


routerrr.post('/addAuthor',addAuthor);

routerrr.put('/updateAuthor/:id',updateAuthor);

routerrr.delete('/deleteAuthor/:id', deleteAuthor);












module.exports = routerrr;
