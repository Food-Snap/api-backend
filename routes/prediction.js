const express = require('express');
const multer = require('multer');
const { predict } = require('../controllers/prediction');
const authMiddleware = require('../middlewares/auth');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/predict', authMiddleware, upload.single('image'), predict);

module.exports = router;
