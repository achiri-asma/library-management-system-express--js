const express = require('express');

const userRegister = require('../../controllers/user/userRegister');

const verifyEmail = require('../../controllers/user/verifyEmail');

const loginUser = require('../../controllers/user/loginUser');

const updateUser = require('../../controllers/user/updateUser');

const deleteUser = require('../../controllers/user/deleteUser');

const desactiveUser = require('../../controllers/user/desactivateAccount');

const router = express.Router();

// Register route

router.post('/register',userRegister);

// Email verification route

router.get('/verify/:token', verifyEmail);

//login route

router.post('/login', loginUser);

// Update user route
router.put('/update',updateUser);

router.delete('/delete/:id',deleteUser);

router.put('/desactiveAccount/:id',desactiveUser);

module.exports = router;