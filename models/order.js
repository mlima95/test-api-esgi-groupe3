'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        burgers: DataTypes.JSON,
        total: DataTypes.DOUBLE,
    }, {
        sequelize,
        modelName: 'Burger',
    });
    return Order;
};
