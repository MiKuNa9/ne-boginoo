const jwt = require("jsonwebtoken");
require("dotenv").config();

//-------

const authenticateToken = async (request, response, next) => {
  const token = request.body.token;
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, payloud) => {
    if (error) {
      return response.status(403).json({ message: "Unauthorized" });
    }
  });
  next();
};
module.exports = authenticateToken;
