'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const db = require('./db');

class Burger extends Model {
    static associate(models) {
        // define association here
    }
};
Burger.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
}, {
    sequelize,
    modelName: 'Burger',
});

module.exports = Burger;
