const bucket = require('../config/storage.config');

exports.uploadImage = async (file) => {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('error', err => {
        throw new Error('Image upload failed');
    });
    blobStream.end(file.buffer);
    await blob.makePublic();
    return blob.publicUrl();
};
