const bcrypt = require("bcrypt");
const { invalidCreds, internalServerError } = require("../utils/errorMessages");

async function hashPassword(password) {
    try {
        const saltRounds = 11;
        const hashedPass = await bcrypt.hash(password, saltRounds);
        return hashedPass;
    } catch(err) {
        throw internalServerError();
    }
}

async function verifyPassword(password, hashPassword) {
    try {
        if(!await bcrypt.compare(password, hashPassword)) throw invalidCreds();
    } catch(err) {
        throw err;
    }
}

module.exports = {
    hashPassword : hashPassword,
    verifyPassword : verifyPassword
}