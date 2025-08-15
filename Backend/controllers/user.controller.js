const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// ✅ Register User Controller
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.fullname.firstname;
  const lastname = req.body.fullname.lastname;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

// ✅ Login User Controller
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  user.password = undefined; // Don't send password in response

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 3600000 // 1 hour
  });

  res.status(200).json({ token, user });
};

// ✅ Get User Profile Controller
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
}

// ✅ Logout User Controller
module.exports.logoutUser = async (req, res, next) => {
  // Clear the cookie
  res.clearCookie("token");
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  await blacklistTokenModel.create({ token });

  // Optionally, you can also blacklist the token if you have a blacklist model
  // await blacklistTokenModel.create({ token: req.cookies.token });

  res.status(200).json({ message: "Logged out successfully" });
}