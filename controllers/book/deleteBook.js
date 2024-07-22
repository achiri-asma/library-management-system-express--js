const Book = require('../../models/bookModel');
const fs = require('fs');
const path = require('path');

const deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Construct the path to the image file in the uploads directory
        const imagePath = path.join(__dirname, '..', '..', book.image);

        // Delete the book image file if it exists
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted image file: ${imagePath}`);
        } else {
            console.log(`Image file not found: ${imagePath}`);
        }

        // Delete the book from the database
        await Book.findByIdAndDelete(bookId);

        res.status(204).send({ message: 'Book deleted successfully' }); // Success without content
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = deleteBook;
