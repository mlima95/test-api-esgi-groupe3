const {Router} = require("express");
const {Burger} = require("../models");
const {checkJWT} = require("../middlewares/security");
const router = new Router();

router.patch("/:id", checkJWT, async (req, res) => {
    try {
        Burger.update(req.body, { where: { id: req.params.id } }).then((burger)=> {
            res.status(200).send({message: "Update patch succefully"});
        }).catch((err)=> {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
