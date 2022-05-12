const express = require("express");
const {default: crud} = require("express-crud-router");
const {default: sequelizeCrud} = require("express-crud-router-sequelize-v6-connector");
const {User} = require("./models");

const app = express();
app.use(express.json());

app.use(crud('/users', sequelizeCrud(User)));

module.exports = app;
