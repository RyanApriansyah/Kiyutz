'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    idUser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Nama harus diisi' },
       notEmpty: { msg: 'Nama harus diisi' },
     },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Password harus diisi' },
       notEmpty: { msg: 'Password harus diisi' },
     },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg : 'Email sudah digunakan'
      },
      validate: {
       isEmail: {msg: 'Format yang digunakan buakn format email'},
       notNull: { msg: 'Email harus diisi' },
       notEmpty: { msg: 'Email harus diisi' },
     },
    },
    statusUser: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};