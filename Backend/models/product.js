'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Product.init({ 
    namaProduk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Nama Produk harus diisi' },
       notEmpty: { msg: 'Nama Produk harus diisi' },
     },
    },
    imgProduk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Image harus diisi' },
       notEmpty: { msg: 'Image harus diisi' },
     },
    },
    descProduk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Deskripsi Produk harus diisi' },
       notEmpty: { msg: 'Deskripsi Produk harus diisi' },
     },
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Harga Produk harus diisi' },
       notEmpty: { msg: 'Harga Produk harus diisi' },
     },
    },
    stok: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: { msg: 'Stok Produk harus diisi' },
       notEmpty: { msg: 'Stok Produk harus diisi' },
     },
    },
    statusProduk: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
    imgProduk: DataTypes.STRING,
    descProduk: DataTypes.TEXT,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    statusProduk: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};