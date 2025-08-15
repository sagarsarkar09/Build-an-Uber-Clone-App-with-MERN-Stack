const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel =require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies or headers
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // 2️⃣ Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
    }

    // 3️⃣ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user and attach to request
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next(); // move to next route
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


module.exports.authCaptain = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies or headers
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // 2️⃣ Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
    }

    // 3️⃣ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find captain and attach to request
    const captain = await captainModel.findById(decoded._id).select("-password");
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized: Captain not found" });
    }

    req.captain = captain;
    return next(); // move to next route
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
