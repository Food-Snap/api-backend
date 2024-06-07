const firestore = require("../config/firestore");

const History = firestore.collection('histories');
module.exports = History;