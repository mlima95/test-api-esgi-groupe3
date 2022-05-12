const {Sequelize, DataTypes} = require('sequelize');
const db = {}
db.Sequelize = Sequelize;

db.sequelize = new Sequelize('postgres://root:password@postgresdb:5432/app') // Example for postgres

try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;

