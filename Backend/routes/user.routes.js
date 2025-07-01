const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("fullname.firstname", "First name is required").notEmpty(),
    body("email", "Valid email is required").isEmail(),
    body("password", "Password must be 6+ chars").isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email", "Valid email is required").isEmail().withMessage("Invalid email format"),
    body("password", "Password is required").notEmpty(),
  ],
  userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
// router.post("/login", loginUser);