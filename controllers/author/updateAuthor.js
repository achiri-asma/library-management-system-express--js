// updateAuthor.js
const Author = require('../../models/authorModel');

const  findBook  = require('../book/findBook'); 

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { fullName, bio, books } = req.body;

    if (!fullName || !bio || !Array.isArray(books) || books.length === 0) {
        return res.status(400).json({ error: 'All fields are required and books should be a non-empty array' });
    }

    try {
        const bookIds = await Promise.all(books.map(async (title) => {
            return await findBook(title); 
        }));

        console.log("Book IDs:", bookIds); 

        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            {
                fullName,
                bio,
                books: bookIds
            },
            { new: true, runValidators: true } // options pour renvoyer le document mis à jour et exécuter les validateurs
        );

        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = updateAuthor;
