const {Router} = require("express");
const {User} = require("../models");
const router = new Router();
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
    try {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(async (user) => {
            if(!user){
                return res.status(404).send({message: "User not found"});
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid){
                return res.status(401).send({message: "Invalid password"});
            }

            res.status(200).send(user);

        }).catch((err) => {

        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
