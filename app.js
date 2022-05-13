const express = require("express");
const {default: crud} = require("express-crud-router");
const {default: sequelizeCrud} = require("express-crud-router-sequelize-v6-connector");
const {User, Burger, Order} = require("./models");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

app.use(crud('/users', {
    ...sequelizeCrud(User),
    create: (body, {req, res}) => {
        User.create({
            ...body,
            password: bcrypt.hashSync(body.password, 8)
        })
    },
}));
app.use(crud('/burgers', sequelizeCrud(Burger)));
app.use(crud('/orders', sequelizeCrud(Order)));
app.use("/burgers", require("./routes/burgers"));
app.use("/login", require("./routes/login"));

module.exports = app;
