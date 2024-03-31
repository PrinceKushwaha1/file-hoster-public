const fs = require("fs");
const encryptPass = require(__dirname + '/encryptPassController');
const encryptToken = require(__dirname + '/encryptTokenController');
const userController = require(__dirname + '/userController');
require('dotenv').config({ path: __dirname + '/../.env' });


async function login(userInfo) {
    try {
        const res = {};
        const username = userInfo.username;
        const password = userInfo.password;

        //get user data
        const user = await userController.getUserData(username);

        await encryptPass.verifyPassword(password, user.content.password);

        const jwtToken = encryptToken.createToken(username);

        res.success = true;
        res.message = "User authenticated";
        res.token = jwtToken;
        delete user.content.password;
        res.content = user.content;
        
        return res;
    } catch (error) {
        throw error;
    }
}

async function signup(userInfo) {
    try {
        const res = {};

        if(!validateUserInfo(userInfo)) {
            res.success = false;
            res.message = "Invalid username or password";
            return res;
        }

        const existingUser = await userController.doesUserExist(userInfo.username);

        if (existingUser) {
            res.success = false;
            res.message = "User already exist";
            return res;
        }

        const hashedPass = await encryptPass.hashPassword(userInfo.password);
        userInfo.password = hashedPass;

        const result = await userController.createUser(userInfo);

        if (result.success == false) {
            res.success = result.success;
            res.message = result.message;
            return res;
        }

        const jwtToken = encryptToken.createToken(userInfo.username);

        res.success = result.success;
        res.message = result.message;
        res.content = result.content;
        res.token = jwtToken;


        return res;
    } catch (error) {
        throw error;
    }
}

function validateUserInfo(userInfo) {

    if(userInfo.username == undefined || userInfo.password == undefined) return false;

    if(userInfo.length == 0 || userInfo.password.length == 0) return false;

    if(userInfo.username.length < 6) {
        return false;
    }

    //This regex validates 
    //if the password has at least one lowercase letter,
    //one uppercase letter, one digit,
    //one special character and is between 8 and 16 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if(!passwordRegex.test(userInfo.password)) {
        return false;
    }

    return true;
}

module.exports = {
    login: login,
    signup: signup
};