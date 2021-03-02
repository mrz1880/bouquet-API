const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Order extends Model {};

Order.init({
  reference: DataTypes.TEXT,
  total_amount: DataTypes.FLOAT(5,2),
  status: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "order"
});

module.exports = Order;