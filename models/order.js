'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const db = require('./db');
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
        modelName: 'Order',
    });

module.exports = Order;
