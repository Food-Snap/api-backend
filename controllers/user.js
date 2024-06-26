const userService = require("../services/user");

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

exports.changePassword = async (req, res, next) => {
  try {
      const userId = req.user.userId; 
      const { oldPassword, newPassword } = req.body;
      const result = await userService.changePassword(userId, oldPassword, newPassword);
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
};