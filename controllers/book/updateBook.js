const Book = require('../../models/bookModel');

const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const { title, genre, publishedDate, availableCopies ,shelf,row,column} = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        // Convert the date format from DD/MM/YYYY to YYYY-MM-DD if provided
        let formattedDate = null;
        if (publishedDate) {
            const [day, month, year] = publishedDate.split('/');
            formattedDate = `${year}-${month}-${day}`;
        }

        // Find the book by ID and update it
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
                title,
                genre,
                publishedDate: formattedDate,
                availableCopies,
                ...(imagePath && { image: imagePath }), 
                // Only update image if a new one is provided
                shelf,
                row,
                column
            },
            { new: true, runValidators: true } // Return the updated book and run validators
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = updateBook;
