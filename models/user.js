'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');
class User extends Model {
    static associate(models) {
        // define association here
    }
};
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'User'
});
const encodePassword = (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
};
User.addHook("beforeCreate", encodePassword);
User.addHook("beforeUpdate", encodePassword);
module.exports = User;
