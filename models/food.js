const firestore = require("../config/firestore");

const Food = firestore.collection('foods');
module.exports = Food;