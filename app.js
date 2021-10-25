require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
// const cors = require("cors");

const database = require("./config/database");
const app = express();

app.use(express.json());
// app.use(cors);

// Logged queries
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome :D");
});

// Auth routes
// Register
app.post("/register", async (req, res) => {
  const db = await database.initDatabase();
  try {
    const { email, password } = req.body;
    if (!checkLoginFormat(email, password)) {
      return res.status(400).end();
    }
    const hashedPw = await bcrypt.hash(password, await bcrypt.genSalt(12));

    const user = await db.createUser({
      email: email,
      password: hashedPw,
    });

    delete user[0]["password"];
    const token = jwt.sign(
      { user_id: user[0]._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user[0].token = token;
    res.status(201).json(user[0]);
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  const db = await database.initDatabase();
  try {
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1s",
        }
      );

      delete user["password"];
      user.token = token;
      console.log("coucou");
      res.status(200).json(user);
    }
    res.status(400).send("Invalid credentials");
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
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return (
    email &&
    password.length >= 7 &&
    password.length <= 40 &&
    email.match(mailformat)
  );
};

module.exports = app;
