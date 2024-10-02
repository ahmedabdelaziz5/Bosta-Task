const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
  }
  catch (err) {
    console.log({
      status: 500,
      message: "Error in generating token",
      error: err.message,
    });
  }
};

const compareToken = (token, key) => {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  }
  catch (err) {
    console.log({
      status: 500,
      message: "Error in comparing token",
      error: err.message,
    });
  }
};

module.exports = {
  generateToken,
  compareToken,
};