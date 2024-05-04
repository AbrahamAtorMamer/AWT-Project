const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
      razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      razorpay_signature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  };

  const Payment = sequelize.define("Payment", attributes);

  return Payment;
}

