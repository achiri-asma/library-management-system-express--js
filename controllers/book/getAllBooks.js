const Book = require('../../models/bookModel');
const path = require('path');

const getAllBooks = async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.find();

        // Map the books to include the image path in JSON format
        const booksWithImagePath = books.map(book => ({
            ...book.toObject(), // Convert Mongoose document to plain object if needed
            image: `${path.join(__dirname, '..', '..',book.image).replace(/\\/g, '/')}`

        }));

        // Send the fetched books with modified image paths as a JSON response
        res.status(200).json(booksWithImagePath);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getAllBooks;
