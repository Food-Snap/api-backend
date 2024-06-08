const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.updateProfile = async (userId, profileData) => {
  const userDoc = User.doc(userId);
  const { height, weight } = profileData;

  if (height && weight) {
    const bmi = weight / (height / 100) ** 2;
    profileData.bmi = bmi;
  }

  await userDoc.update(profileData);
  const updatedUser = await userDoc.get();
  return updatedUser.data();
};

exports.getProfile = async (userId) => {
  const userDoc = await User.doc(userId).get();
  if (!userDoc.exists) {
    throw new Error("User not found");
  }
  return userDoc.data();
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  const userDoc = await User.doc(userId).get();
  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();
  const isMatch = await bcrypt.compare(oldPassword, userData.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await User.doc(userId).update({ password: hashedPassword });
  return { message: "Password changed" };
};
