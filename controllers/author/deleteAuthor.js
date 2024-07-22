const Author = require('../../models/authorModel');

const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAuthor = await Author.findOneAndDelete(id);

        if (!deletedAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = deleteAuthor;

