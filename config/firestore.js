const { Firestore } = require("@google-cloud/firestore");

require("dotenv").config();

const firestore = new Firestore({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE
});

module.exports = firestore