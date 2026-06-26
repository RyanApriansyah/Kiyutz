'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kategori.associate = function(models) {
        Kategori.hasMany(models.Product, {
          foreignKey: 'idKategori'
        });
      };
    }
  }
  Kategori.init({
    idKategori: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    namaKategori: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {msg : 'Nama kategori sudah ada'},
      validate: {
       notNull: { msg: 'Nama Kategori harus diisi' },
       notEmpty: { msg: 'Nama Kategori harus diisi' },
     },
    },
    statusKategori: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active'
     },
  }, {
    sequelize,
    modelName: 'Kategori',
  });
  return Kategori;
};