const Book = require('../../models/bookModel');
const path = require('path');

const searchBooks = async (req, res) => {
    const { query } = req.params;

    try {
        let books = [];

        // Search by title or genre
        books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        // Update the image path to include the local file path
        const booksWithImageFile = books.map(book => ({
            ...book.toObject(), // Convert Mongoose document to plain object if needed
            image: `${path.join(__dirname, '..', '..',book.image).replace(/\\/g, '/')}`
        }));

        res.status(200).json(booksWithImageFile);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = searchBooks;
