const Book = require('../../models/bookModel');


const addBook = async (req, res) => {
    const { title, genre, publishedDate, availableCopies,shelf,row,column} = req.body;
    const imagePath = req.file ? req.file.path : null;
    
    if (!title || !genre || !publishedDate || !availableCopies || !imagePath || !shelf || !row || !column) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const [day, month, year] = publishedDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    try {
      
        const newBook = new Book({
            title,
            genre,
            publishedDate:formattedDate,
            availableCopies,
            image:imagePath,
            shelf,
            row,
            column
        });

        // Sauvegarde du livre dans la base de données
        const savedBook = await newBook.save();

        res.status(201).json({ message: 'Book added successfully', book: savedBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = addBook;
