const express = require("express");
const router = express.Router();
const verifyHeaderToken = require("../middlewares/headerTokenVerifier");
const users = require("../controllers/userController");

router.route("/:username").get(verifyHeaderToken, async (req, res, next) => {
    try {
        const result = await users.getUserData(req.params.username);
        delete result.content.password;
        res.status(200).send(result.content);
    } catch (error) {
        next(error);
    }
});

router.route("/checkun/:username").get(async (req, res, next) => {
    try {
        const doesUserExist = await users.doesUserExist(req.params.username);

        if (doesUserExist) {
            res.status(200).json({ exists: true, message: "Username already exists" });
        } else {
            res.status(200).json({ exists: false, message: "Username available" });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;