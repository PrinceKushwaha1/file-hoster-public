require('dotenv').config({ path: __dirname+'/../.env' });
const { forbiddenPath } = require('../utils/errorMessages');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

function verifyHeaderToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      // Verify the token
      jwt.verify(bearerToken, secretKey, (err, authData) => {
        if(err) {
          next(forbiddenPath());
        } else {
          req.authData = authData;
          next();
        }
      });
    } else {
      // Forbidden
      next(forbiddenPath());
    }
  }

  module.exports = verifyHeaderToken;