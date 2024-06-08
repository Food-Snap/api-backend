const User = require("../models/user");

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
