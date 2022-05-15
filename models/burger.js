'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db');

class Burger extends Model {
    static associate(models) {
        // define association here
    }
};
Burger.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isDecimal: true,
        }
    }
}, {
    sequelize,
    modelName: 'Burger',
});

module.exports = Burger;
