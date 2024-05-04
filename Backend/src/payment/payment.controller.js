const crypto = require("crypto");
const db = require("../helpers/db.helper");
const instance = require('../helpers/razorpay');

const checkout = async (req, res) => {
  const options = {
    amount: Number(193 * 100),
    currency: "INR",
  };

  // Assuming instance.orders.create returns order data
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};
const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      // Insert payment data using Sequelize
      await db.Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (error) {
      console.error("Error inserting payment into MySQL:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid Signature",
    });
  }
};
module.exports = {
    checkout,
    paymentVerification
    }