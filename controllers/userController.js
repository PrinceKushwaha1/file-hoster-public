const User = require('../models/user');
const { userNotFound, invalidPassword } = require('../utils/errorMessages');

async function createUser(userInfo) {
    try {
        const res = {};
        
        const user = new User({
            username : userInfo.username,
            password : userInfo.password,
            display_name : userInfo.display_name,
            email : userInfo.email,
            premium_level : 0
        });
        
        const result = await user.save();

        res.success = true;
        res.message = "user has been created";
        res.content = {
            "username" : result.username,
            "email" : result.email,
            "display_name" : result.display_name,
            "premium_level" : result.premium_level
        };

        return res;
    } catch(err) {
        throw err;
    }
}

async function doesUserExist(username) {
    try {
        const result = await User.find({"username" : username});
        return result.length != 0;
    } catch(err) {
        throw err;
    }
}

async function getUserData(username) {
    try {
        const res = {};

        const result = await User.find({"username": username});
        if(result.length == 0) {
            throw userNotFound();
        } else {
            res.content = result[0].toObject();
        }

        return res;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    createUser : createUser,
    doesUserExist : doesUserExist,
    getUserData : getUserData
}