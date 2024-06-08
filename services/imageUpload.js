const bucket = require('../config/storage');

const uploadImage = async (file) => {
    const blob = bucket.file(`${Date.now()}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', err => {
            reject(err);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = { uploadImage };
