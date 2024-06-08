const Food = require('../models/food');

exports.getFoods = async () => {
    const foodSnapshot = await Food.get();
    const foods = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return foods;
};

exports.getFoodById = async (foodId) => {
    const foodDoc = await Food.doc(foodId).get();
    if (!foodDoc.exists) {
        throw new Error('Food not found');
    }
    return { id: foodDoc.id, ...foodDoc.data() };
};
