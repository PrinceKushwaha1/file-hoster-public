const express = require('express');
const {login, signup} = require('../controllers/authController');
const router = express.Router();

router.route("/login").post(async (req, res, next) => {
    try {
        const result = await login(req.body);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

router.route("/signup").post(async (req, res, next) => {
    try {
        const result = await signup(req.body);
        res.status(200).send(result);  
    } catch (error) {   
        next(error);
    }
});

module.exports = router;