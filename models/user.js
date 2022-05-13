'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db');
class User extends Model {
    static associate(models) {
        // define association here
    }
};
User.init({
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    roles: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'User',
});

module.exports = User;
