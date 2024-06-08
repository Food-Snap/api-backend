const { predictImage } = require('../services/prediction');

const predictHandler = async (req, res) => {
  try {
    const imgFile = req.file;
    const result = await predictImage(imgFile);
    res.json(result);
  } catch (error) {
    console.error('Error in prediction:', error);
    res.status(500).json({ error: 'Error making prediction' });
  }
};

module.exports = { predict: predictHandler };
