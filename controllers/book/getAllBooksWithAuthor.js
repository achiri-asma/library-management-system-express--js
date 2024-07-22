const Book = require('../../models/bookModel');

const getAllBooksWithAuthors = async (req, res) => {
  try {
    const booksWithAuthors = await Book.aggregate([
      {
        $lookup: {
          from: 'authors', // Nom de la collection des auteurs
          localField: '_id',
          foreignField: 'books',
          as: 'authors',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          genre: 1,
          publishedDate: 1,
          availableCopies: 1,
          image: 1,
          shelf:1,
          row:1,
          column:1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          'authors.fullName': 1,
          'authors.bio': 1,
        },
      },
    ]);

    res.status(200).json({ books: booksWithAuthors });
  } catch (error) {
    console.error('Error fetching books with authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getAllBooksWithAuthors;
