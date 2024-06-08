const tf = require("@tensorflow/tfjs");
const Food = require("../models/food");
const Jimp = require("jimp");

const classIndices = { bakso: 0, gado: 1, gudeg: 2, rendang: 3, sate: 4 };
const classes = Object.keys(classIndices);

let model;

const loadModel = async () => {
  if (!model) {
    const modelUrl = process.env.MODEL_URL;
    model = await tf.loadGraphModel(modelUrl);
  }
  return model;
};

async function predictImage(imageBuffer) {
  try {
    const image = await Jimp.read(imageBuffer);
    image.resize(224, 224);
    const tensor = tf.browser
      .fromPixels({
        data: new Uint8Array(image.bitmap.data),
        width: image.bitmap.width,
        height: image.bitmap.height,
      })
      .expandDims()
      .toFloat()
      .div(tf.scalar(255.0));

    const model = await loadModel();

    const prediction = model.predict(tensor).dataSync();
    console.log(prediction);
    const predictedClassIndex = prediction.indexOf(Math.max(...prediction));
    const predictedClass = classes[predictedClassIndex];
    const foodSnapshot = await Food.where("name", "==", predictedClass).get();
    if (foodSnapshot.empty) {
      throw new Error("Food not found!");
    }
    const foodDoc = foodSnapshot.docs[0];
    const foodData = foodDoc.data();
    const predictedFood = {
      name: foodData.name,
      calories: foodData.calories,
      carbs: foodData.carbs,
      protein: foodData.protein,
      fat: foodData.fat,
      foodId: foodDoc.id,
    };
    return predictedFood;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { predictImage };
