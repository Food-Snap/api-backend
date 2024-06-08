const express = require('express');
const { save, getHistory } = require('../controllers/history');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/save', authMiddleware, save);
router.get('/history', authMiddleware, getHistory);


module.exports = router;
