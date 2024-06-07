const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (userData) => {
  const checkUser = await User.where("email", "==", userData.email).get();
  if (!checkUser.empty) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const userDoc = User.doc();
  const user = {
    email: userData.email,
    password: hashedPassword,
    name: "",
    gender: "",
    age: null,
    weight: null,
    height: null,
    bmi: null,
  };

  await userDoc.set(user);
  return { id: userDoc.id, ...user };
};

exports.login = async ({ email, password }) => {
  const userSnapshot = await User.where("email", "==", email).get();
  if (userSnapshot.empty) {
    throw new Error("Invalid credentials");
  }

  const userDoc = userSnapshot.docs[0];
  const user = userDoc.data();
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: userDoc.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
