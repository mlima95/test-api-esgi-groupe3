'use strict';
const {
    Model
} = require('sequelize');
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

module.exports = Order;
