const User = require('../../models/userModel');

const desactivateAccount = async (req, res) => {
    const userId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Optionally, clear any session data or tokens associated with the user

        res.json({ message: 'User account deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = desactivateAccount;
