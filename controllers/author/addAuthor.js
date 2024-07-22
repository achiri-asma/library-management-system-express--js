const Author = require('../../models/authorModel');

const findBook = require('../book/findBook');


const addAuthor = async (req, res) => {
    const {fullName, bio,books} = req.body;
    
    if (!fullName || !bio || !Array.isArray(books) || books.length === 0 ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {

        const bookIds = await Promise.all(books.map(async (title) => {
            return await findBook(title);
        }));
      
        const newAuthor = new Author({
            fullName, 
            bio,
            books: bookIds
        });

         await newAuthor.save();

        res.status(201).json({ message: 'Author added successfully', newAuthor});
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = addAuthor;
