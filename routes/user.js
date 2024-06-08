const express = require('express');
const { updateProfile, getProfile, changePassword} = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.put('/edit-profile', authMiddleware, updateProfile);
router.get('/profile', authMiddleware, getProfile);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
