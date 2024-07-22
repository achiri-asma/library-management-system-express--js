const User = require('../../models/userModel');

const deleteUser = async (req, res) => {
    const id = req.params.id; // Assurez-vous que vous utilisez le bon paramètre

    try {
        // Utilisation de findByIdAndDelete avec un ID valide
        const result = await User.findByIdAndDelete(id);

        if (result) {
            res.status(204).send({ msg: 'User deleted' }); // Succès sans contenu
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = deleteUser;
