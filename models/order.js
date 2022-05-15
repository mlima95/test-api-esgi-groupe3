'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db');
    class Order extends Model {
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        burgers: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
    }, {
        sequelize,
        modelName: 'Order',
    });

module.exports = Order;
