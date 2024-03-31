const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

function encryptFile(fileBuffer) {
    const key = crypto.randomBytes(32);

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

    const result = {};
    result.encryptedFileBuffer = encryptedBuffer;
    result.key = key;
    result.iv = iv;

    return result;
}

function decryptFile(fileBuffer, key, iv) {
    const decypher = crypto.createDecipheriv(algorithm, key, iv);

    const decryptedBuffer = Buffer.concat([decypher.update(fileBuffer), decypher.final()]);

    const result = {};
    result.decryptedFileBuffer = decryptedFileBuffer;

    return result;
}

module.exports = {
    encryptFile : encryptFile,
    decryptFile : decryptFile
};