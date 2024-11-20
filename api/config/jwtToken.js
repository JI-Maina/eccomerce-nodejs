const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  // return jwt.sign({ id }, "secret", { expiresIn: "3d" });
};

module.exports = { generateToken };
