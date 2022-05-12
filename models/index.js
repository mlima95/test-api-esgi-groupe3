exports.sequelize = require('./db');
exports.User = require("../models/user");
exports.Order = require("../models/order");
exports.Burger = require("../models/burger");

exports.User.hasMany(exports.Order, {
    foreignKey: 'userId',
    as: 'orders'
});
exports.Order.belongsTo(exports.User, {
    foreignKey: 'orderId',
    as: 'user'
});
exports.Order.hasOne(exports.User, {
    foreignKey: 'orderId'
});
// exports.Order.hasMany(exports.Burger, {
//     foreignKey: 'orderId',
//     as: 'burgers'
// });
exports.Burger.belongsToMany(exports.Order, {
    through: 'order_burgers',
    foreignKey: 'burgerId',
    otherKey: 'orderId'
});

exports.Order.belongsToMany(exports.Burger, {
    through: 'burger_orders',
    foreignKey: 'orderId',
    otherKey: 'burgerId'
});

