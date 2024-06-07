const userService = require("../services/user.service");

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const updatedUser = await userService.updateProfile(userId, req.body);
    res.status(200).json({ message: "Profile Updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
      const userId = req.user.userId;
      const user = await userService.getProfile(userId);
      res.status(200).json({ user });
  } catch (error) {
      next(error);
  }
};