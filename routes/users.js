
const {Router} = require("express");
const { User } = require("../models");
const router = new Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
         await User.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then((user)=> {
            delete user.password;
            res.status(201).send(user);
        }).catch((err)=> {
            console.log("gghgghg",err);
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
