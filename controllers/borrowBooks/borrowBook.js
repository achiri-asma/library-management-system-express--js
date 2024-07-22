const Borrow = require('../../models/borrowModel');
const Book = require('../../models/bookModel');
const moment = require('moment-timezone');

const borrowBook = async (req, res) => {

  try {
    const { bookId, userId } = req.body;

    // Check if bookId or userId is missing
    if (!bookId || !userId) {
      return res.status(400).json({ message: 'Missing bookId or userId' });
    }

    // Find the book by its ID
    const book = await Book.findById({ _id: bookId });

    // If book not found, return 404
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if no copies are available
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No copies available for borrowing' });
    }

    // Create a new Borrow record with the correct timezone
    const newBorrow = new Borrow({
      bookId,
      userId,
      borrowDate: moment().tz('Europe/Paris').add(1, 'hours').toDate(), // Set to Paris timezone
      returnDate: null,
    });

    // Save the Borrow record
    const savedBorrow = await newBorrow.save();

    // Decrease available copies by 1
    book.availableCopies -= 1;

    // Save the updated book
    await book.save();


    res.status(200).json(savedBorrow);
  } catch (error) {
    console.error('Error borrowing book:', error);

    // Handle specific errors
    if (error instanceof SyntaxError) {
      return res.status(400).json({ message: 'Invalid JSON in request body', error: error.message });
    }

    // Handle generic error
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = borrowBook;
