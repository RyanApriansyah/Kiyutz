"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      idProduct: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idKategori: {
        allowNull: false,
        references: {
          model: "Kategoris",
          key: "idKategori",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.INTEGER,
      },
      namaProduk: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imgProduk: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      descProduk: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      stok: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      statusProduk: {
        allowNull: false,
        type: Sequelize.ENUM("Active", "Inactive"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
