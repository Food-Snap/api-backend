const Food = require("../models/food");
const History = require("../models/history");

const savePredictionResult = async (userId, foodId, imageUrl) => {
  const date = new Date().toISOString();
  const historyDoc = History.doc();
  const historyData = {
    userId: userId,
    foodId: foodId,
    imageUrl: imageUrl,
    date: date,
  };
  await historyDoc.set(historyData);
  return historyData;
};

const getHistoryData = async (userId) => {
  const historySnapshot = await History.where("userId", "==", userId).get();
  if (historySnapshot.empty) {
    return [];
  }

  const historyData = [];
  for (const doc of historySnapshot.docs) {
    const data = doc.data();
    const foodDoc = await Food.doc(data.foodId).get();
    if (foodDoc.exists) {
      const foodData = foodDoc.data();
      historyData.push({
        date: data.date,
        imageUrl: data.imageUrl,
        predictedFood: {
          name: foodData.name,
          calories: foodData.calories,
          carbs: foodData.carbs,
          protein: foodData.protein,
          fat: foodData.fat,
          calcium: foodData.calcium,
        },
      });
    }
  }

  return historyData;
};

module.exports = { savePredictionResult, getHistoryData };
