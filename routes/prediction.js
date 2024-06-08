const express = require('express');
const { predict } = require('../controllers/prediction');
const authMiddleware = require('../middlewares/auth');
const upload = require('../config/multer');

const router = express.Router();

router.post('/predict', authMiddleware, upload.single('image'), predict);

module.exports = router;
