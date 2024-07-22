const User = require('../../models/userModel');

const { validationResult } = require('express-validator');

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, role } = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user details
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({ msg: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

module.exports = updateUser;
