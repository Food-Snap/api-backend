const tf = require('@tensorflow/tfjs-node');

const classIndices = { 'bakso': 0, 'gado': 1, 'gudeg': 2, 'rendang': 3, 'sate': 4 };
const classes = Object.keys(classIndices);

async function predictClassification(model, imageBuffer) {
    try {
      const tensor = tf.node.decodeImage(imageBuffer.buffer, 3)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
      .div(tf.scalar(255.0));
        
      const prediction = model.predict(tensor);
      const score = await prediction.data();
      const predictedClassIndex = score.indexOf(Math.max(...score));
      const predictedClass = classes[predictedClassIndex];
  
      return { label: predictedClass, index: predictedClassIndex, score: score };

    } catch (error) {
      console.log(error);
    }
  }


const predictImage = async (imgFile) => {
  try {
    const model = await tf.loadGraphModel(process.env.MODEL_URL)
    const prediction = predictClassification(model, imgFile);
    return prediction;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw new Error('Error making prediction');
  }
};

module.exports = { predictImage };