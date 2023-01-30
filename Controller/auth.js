const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (request, response) => {
  const { email, password } = request.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });
    response.status(200).json({
      message: "successfully created user",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;
  console.log(email);
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);

  if (!user) {
    return response.status(404).json({
      message: "not found",
    });
  }
  if (match) {
    const token = jwt.sign(
      {
        user: user.email,
      },
      process.env.ACCESS_TOKEN_KEY
    );
    response.status(200).json({
      message: "successfully logged in user",
      email: user.email,
      token: token,
    });
  } else {
    response.status(401).json({
      message: "failed",
    });
  }
};

const getUser = async (request, response) => {
  const token = request?.headers?.token;
  if (!token) {
    return response.status(400).json({ message: "Invalid token" });
  }
  try {
    const data = await jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
