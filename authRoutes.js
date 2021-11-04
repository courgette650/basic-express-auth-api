require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const User = require("./model/user");

const router = express.Router();

router.use(express.json());

// Logged queries
router.post("/profile", auth, (req, res) => {
  res.status(200).send("Welcome :D");
});

// Auth routes
// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, firstname } = req.body;
    if (!checkLoginFormat(email, password)) {
      return res.status(400).end();
    }
    const hashedPw = await bcrypt.hash(password, await bcrypt.genSalt(12));
    const user = await User.create({
      email,
      password: hashedPw,
      name,
      firstname,
    });

    delete user._doc["password"];
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("oui");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      delete user._doc["password"];

      user._doc.token = token;
      res.status(200).json(user);
    } else res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
});

/**
 * Check email & password format
 * @param {*} email
 * @param {*} password
 * @returns false if wrong, true if correct
 */
const checkLoginFormat = (email, password) => {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return (
    email &&
    password.length >= 7 &&
    password.length <= 40 &&
    email.match(mailformat)
  );
};

module.exports = router;
