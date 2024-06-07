const firestore = require("../config/firestore");

const User = firestore.collection("users");
module.exports = User;
