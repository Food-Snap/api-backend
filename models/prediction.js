const firestore = require("../config/firestore");

const Prediction = firestore.collection('predictions');
module.exports = Prediction;