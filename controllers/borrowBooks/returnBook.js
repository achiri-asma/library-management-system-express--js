const Borrow = require('../../models/borrowModel');
const Book = require('../../models/bookModel');
const moment = require('moment-timezone');

const returnBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Find the borrowed record
    const borrowRecord = await Borrow.findOne({ bookId, userId });

    // If borrow record not found, return 404
    if (!borrowRecord) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    // Check if the book has already been returned
    if (borrowRecord.returnDate) {
      return res.status(400).json({ message: 'Book has already been returned' });
    }

    // Set the return date to current date in Paris timezone
    borrowRecord.returnDate = moment().tz('Europe/Paris').add(1, 'hours').toDate();

    // Save the updated borrow record
    const updatedBorrowRecord = await borrowRecord.save();

    // Find the corresponding book and increment availableCopies
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.availableCopies += 1;
    await book.save();

    

    res.status(200).json(updatedBorrowRecord);
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = returnBook;
