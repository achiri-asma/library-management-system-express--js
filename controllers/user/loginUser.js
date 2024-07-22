const User = require('../../models/userModel');

const { validationResult } = require('express-validator');


const bcrypt = require('bcryptjs');

require('dotenv').config();

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        if (!user.isActive) {
            return res.status(400).json({ msg: 'your account is desactivated' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the email is verified
        if (!user.isVerified) {
            return res.status(400).json({ msg: 'Please verify your email before logging in' });
        }
        
        


        res.status(200).json({ msg: 'log in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

module.exports = loginUser;
