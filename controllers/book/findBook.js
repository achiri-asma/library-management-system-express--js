const Book = require('../../models/bookModel');

const findBook = async (title) => {
    let book = await Book.findOne({ title });
    if (!book) {
        return "book not found";
    }
    return book._id;
   
};

module.exports =  findBook ;
