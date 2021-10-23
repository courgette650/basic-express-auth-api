const express = require("express");
// const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db");
const utils = require("./utils");
const jwt = require("jsonwebtoken");

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const server = async () => {
  const db = await database.initDatabase();

  const app = express();
  app.use(cors());
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: true,
  //   })
  // );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/register", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (
      !email ||
      password.length < 7 ||
      password.length > 40 ||
      !email.match(mailformat)
    ) {
      return res.status(400).end();
    }
    const hashedPw = await utils.saltHash(password);
    try {
      return res.json(
        delete (await db.createUser({ email, password: hashedPw })["password"])
      );
    } catch (err) {
      return res.send(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);
    const passwdMatching = await utils.hashMatch(password, user.password);
    if (passwdMatching) {
      console.log("Logged");
      const header = {};
      const payload = {};
      const signature = {};
      const token = jwt.sign(header, payload, signature);
      // req.session.user = user;
    } else {
      console.log("not logged in");
    }
    res.status(200);
    const returnUser = delete { ...user }["password"];
    return res.send(returnUser);
  });

  app.post("/logout", (req, res, next) => {
    req.session.user = null;
    return res.send("DONE");
  });

  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
};

server().catch(console.error);
