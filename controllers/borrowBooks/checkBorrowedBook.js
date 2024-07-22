const Borrow = require('../../models/borrowModel');
const Book = require('../../models/bookModel');
const mongoose = require('mongoose');

// Function to check which books are borrowed
const checkBorrowedBooks = async (req, res) => {
  try {
    // Find all borrow records where returnDate is null
    const borrowedRecords = await Borrow.find({ returnDate: null }).populate('bookId userId');

    // If no borrowed records are found
    if (!borrowedRecords.length) {
      return res.status(200).json({ message: 'No books are currently borrowed' });
    }

    // Map through the borrowed records to get book details
    const borrowedBooks = borrowedRecords.map(record => ({
      bookId: record.bookId._id,
      title: record.bookId.title,
      userId: record.userId._id,
      userName: record.userId.name,
      borrowDate: record.borrowDate,
    }));

    res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error('Error checking borrowed books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = checkBorrowedBooks;
