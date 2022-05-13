const {Router} = require("express");
const {User} = require("../models");
const router = new Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
    try {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(async (user) => {

            if (!user) {
                return res.status(404).send({message: "User not found"});
            }

            let passwordIsValid = bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (err) {
                    throw new Error(err);
                }

                if (response) {
                    const expireIn = "24h";
                    const token = jwt.sign({username: user.username}, process.env.SECRET_KEY, {expiresIn: expireIn});
                    res.header('Authorisation', 'Bearer ' + token);
                    return res.status(200).send({
                        message: "Authentification succesfull",  
                         token
                    });
                }
                return res.status(401).send({message: "Invalid credentials"});
            });

        }).catch((err) => {

        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
