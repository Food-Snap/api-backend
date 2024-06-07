const { Storage } = require("@google-cloud/storage");

require("dotenv").config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE
})

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

module.exports = bucket