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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
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
}, {
    sequelize,
    modelName: 'User',
});

module.exports = User;
