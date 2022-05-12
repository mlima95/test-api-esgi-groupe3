'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    return Burger;
};
