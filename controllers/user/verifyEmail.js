const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyEmail = async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Trouver l'utilisateur par ID
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Mettre à jour les propriétés de l'utilisateur
        user.isVerified = true;
        user.save();  // Assurez-vous que save() est une méthode du modèle Mongoose

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = verifyEmail;
