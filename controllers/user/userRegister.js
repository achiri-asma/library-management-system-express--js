const User = require('../../models/userModel');
const { validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../../config/email');
const generateToken = require('../../middlewares/tokens').generateToken;
require('dotenv').config();

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullName, email, password, role } = req.body;

        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        const newUser = new User({
            fullName,
            email,
            password,
            role,
            isVerified: false
        });

        await newUser.save();

        const token = generateToken(newUser);

        await sendVerificationEmail(newUser.email, token);

        res.status(201).json({ msg: 'Registration successful. Please check your email to verify your account.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

module.exports = registerUser;
