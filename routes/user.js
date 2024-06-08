const express = require('express');
const { updateProfile, getProfile } = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const { getProfile } = require('../services/user');

const router = express.Router();

router.put('/edit-profile', authMiddleware, updateProfile);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
