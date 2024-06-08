const { savePredictionResult, getHistoryData } = require("../services/history");

exports.save = async (req, res, next) => {
  try {
    const { foodId, imageUrl } = req.body;
    const userId = req.user.userId;
    const historyData = await savePredictionResult(userId, foodId, imageUrl);
    res
      .status(201)
      .json({ message: "Prediction result saved", history: historyData });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
      const userId = req.user.userId;
      const historyData = await getHistoryData(userId);
      res.status(200).json({ historyData });
  } catch (error) {
      next(error);
  }
};
