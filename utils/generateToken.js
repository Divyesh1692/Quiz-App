const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    return token;
  } catch (error) {
    res
      .status(500)
      .send({ message: "error generating token", error: error.message });
  }
};

module.exports = generateToken;
