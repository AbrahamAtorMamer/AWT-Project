const express = require('express');
const cors = require("cors");
const crypto = require('crypto');
const register = require('./src/profile/user.routes');
const error = require('./src/middleware/error');
const auth = require("./auth");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/users",register);
app.use(error.errorHandler);

// Function to generate a random secure token
const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Set the secret key as an environment variable
process.env.JWT_SECRET = generateSecretKey();

app.get("/", (req, res) => res.send("Vipi Dunia"));
app.listen(port, () => console.log(`App listening at port ${port}`));