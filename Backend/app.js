require('dotenv').config();
const express = require('express');
const cors = require("cors");
const crypto = require('crypto');
const Razorpay = require('razorpay');
const register = require('./src/profile/user.routes');
const campaign = require('./src/campaign/campaign.routes');
const funding = require('./src/funding/funding.routes');
const category = require('./src/category/category.routes');
const team = require('./src/team/team.routes');
const error = require('./src/middleware/error');
const app = express();
const port = parseInt(process.env.PORT);
const payment = require("./src/payment/payment.route")
const instance = require("./src/helpers/razorpay");

instance;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//User Registration and Authentication routes
app.use("/users",register);

//Campaign creation routes
app.use("/campaign",campaign);
app.use("/funding",funding);
app.use("/category",category);
app.use("/team",team);
app.use(error.errorHandler);

//

// Use payment router
// Routes
app.use("/payment", payment);

// Route to get Razorpay API key
app.get("/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);
// app.use('/payment', payment);
//static Images Folder

app.use('/Images', express.static('./Images'))
// Function to generate a random secure token
const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Setting the secret key as an environment variable
process.env.JWT_SECRET = generateSecretKey();

app.get("/", (req, res) => res.send("Vipi Dunia"));
app.listen(port, () => console.log(`App listening at port ${port}`));
