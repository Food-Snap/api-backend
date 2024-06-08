const { predictImage } = require("../services/prediction");
const { uploadImage } = require("../services/imageUpload")

const predictHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    const imageUrl = await uploadImage(req.file);
    const predictedFood = await predictImage(req.file.buffer);
    res.status(200).json({imageUrl, predictedFood});
  } catch (error) {
    console.error("Error in prediction:", error);
    res.status(500).json({ error: "Error making prediction" });
  }
};

module.exports = { predict: predictHandler };
