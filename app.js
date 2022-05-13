const express = require("express");
const {default: crud} = require("express-crud-router");
const {default: sequelizeCrud} = require("express-crud-router-sequelize-v6-connector");
const {User, Burger, Order} = require("./models");
const { checkJWT, checkRoleUser, checkRoleAdmin} = require("./middlewares/security");
const app = express();
app.use(express.json());

/******************* AUTH ************************/
app.use("/users", require("./routes/users"))
app.use("/login", require("./routes/login"));

app.use([checkJWT, checkRoleAdmin]);


// Don't override the create
const usersCrudRoutes = sequelizeCrud(User);
delete usersCrudRoutes.create;

app.use(crud('/users', usersCrudRoutes));
app.use(crud('/burgers', sequelizeCrud(Burger)));
app.use(crud('/orders', sequelizeCrud(Order)));
app.use("/burgers", require("./routes/burgers"));

module.exports = app;
