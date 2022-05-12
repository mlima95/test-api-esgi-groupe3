const db = require('db');
db.user = require("../models/user")(db.sequelize, db.Sequelize);
db.order = require("../models/order")(db.sequelize, db.Sequelize);
db.burger = require("../models/burger")(db.sequelize, db.Sequelize);

db.user.hasMany(db.order, {
    foreignKey: 'userId',
    as: 'orders'
});
db.order.belongsTo(db.user, {
    foreignKey: 'orderId',
    as: 'user'
});
db.order.hasOne(db.user, {
    foreignKey: 'orderId'
});
// db.order.hasMany(db.burger, {
//     foreignKey: 'orderId',
//     as: 'burgers'
// });
db.burger.belongsToMany(db.order, {
    through: 'order_burgers',
    foreignKey: 'burgerId',
    otherKey: 'orderId'
});

db.order.belongsToMany(db.burger, {
    through: 'burger_orders',
    foreignKey: 'orderId',
    otherKey: 'burgerId'
});
