const foodService = require('../services/food');

exports.getFoods = async (req, res, next) => {
    try {
        const foods = await foodService.getFoods();
        res.status(200).json({ foods });
    } catch (error) {
        next(error);
    }
};

exports.getFoodById = async (req, res, next) => {
    try {
        const { foodId } = req.params;
        const food = await foodService.getFoodById(foodId);
        res.status(200).json({ food });
    } catch (error) {
        next(error);
    }
};
