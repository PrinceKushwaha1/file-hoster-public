const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname+'/../.env' });
const { invalidToken } = require('../utils/errorMessages');

const secretKey = process.env.SECRET_KEY;

function createToken(username) {
    try {
        const token = jwt.sign({"username" : username}, secretKey);
        return token;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

function verifyToken(token) {
    try {
        const decode = jwt.verify(token, secretKey);
        if(!decode) throw invalidToken();
    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createToken : createToken,
    verifyToken : verifyToken,
}