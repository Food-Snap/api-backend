const express = require('express');
const { getFoods, getFoodById } = require('../controllers/food');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/food', getFoods);
router.get('/food/:foodId', getFoodById);

module.exports = router;
