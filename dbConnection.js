
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: __dirname+'/.env' });

const dburl = process.env.DB_URL;

async function connect() {
  try {
    await mongoose.connect(dburl, {
      sslKey: path.join(__dirname, 'cert', 'mongodbkey.pem'),
      sslCert: path.join(__dirname, 'cert', 'mongodbcert.pem'),
      serverApi: ServerApiVersion.v1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
  } catch(err) {
    console.log("Error at connecting to database", err);
    throw err;
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch(err) {
    console.log("Error at closing connection with database", err);
    throw err;
  }
}

module.exports = {
  connect: connect,
  disconnect: disconnect
};