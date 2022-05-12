const express = require('express');
const app = express();
const port = process.env.PORT
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://root:password@postgresDb:5432/app') // Example for postgres
const crud = require('express-crud-router').default;
const sequelizeCrud = require('express-crud-router-sequelize-v6-connector').default;
const User = require('./models/user.js')(sequelize, DataTypes);

/********************* CONNEXION *********************/
try {
    sequelize.authenticate();
    sequelize.sync({ force: true })
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


/********************* API  **************************/
app.use(crud('/users', sequelizeCrud(User)))


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
