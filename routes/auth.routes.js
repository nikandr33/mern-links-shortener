const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /api/auth
// Registration auth-point
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimum password length of 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data at registration",
        });

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate)
        return res.status(400).json({ message: "User already exists" });

      const salt = 17;
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res
        .status(201)
        .json({ message: "Registration was successfully completed" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// /api/auth
// Log in auth-point
router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data at log in",
        });

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "User doesn't exist" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Wrong password, try again" });

      const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
