require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const db = require("../helpers/db.helper");
const {checkout, paymentVerification} = require("../payment/payment.controller");
const router = express.Router();



router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

//export default router;
// router.post('/orders', async (req, res) => {
//   try {
//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     const options = req.body;

//     const order = await instance.orders.create(options);

//     if (!order) return res.status(500).send('Some error occurred');

//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/order/validate", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//   //order_id + "|" + razorpay_payment_id
//   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = sha.digest("hex");
//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ msg: "Transaction is not legit!" });
//   }

//   res.json({
//     msg: "success",
//     orderId: razorpay_order_id,
//     paymentId: razorpay_payment_id,
//   });
// });

// router.post('/success', async (req, res) => {
//   try {
//     const {
//       orderCreationId,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     } = req.body;

//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
//     shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpaySignature)
//       return res.status(400).json({ msg: 'Transaction not legit!' });

//     const newPayment = await db.Payment.create({
//       razorpayDetails: {
//         orderId: razorpayOrderId,
//         paymentId: razorpayPaymentId,
//         signature: razorpaySignature,
//       },
//       success: true,
//     });

//     res.json({
//       msg: 'success',
//       orderId: razorpayOrderId,
//       paymentId: razorpayPaymentId,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
