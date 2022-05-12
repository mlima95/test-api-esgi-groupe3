const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://root:password@postgresdb:5432/app') // Example for postgres

try {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;

