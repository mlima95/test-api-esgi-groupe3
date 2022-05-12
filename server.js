const express = require('express');
const app = express();
const port = process.env.PORT
const db = require("./models/db.js");
const crud = require('express-crud-router').default;
const sequelizeCrud = require('express-crud-router-sequelize-v6-connector').default;


/********************* API  **************************/
app.use(crud('/users', sequelizeCrud(db.user)));


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
