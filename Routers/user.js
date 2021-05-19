const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../Middlewares/secret.json");


/* Verify User */
router.post("/login", (req, res) => {
  jwt.sign(
    {
      _id: token,
      email: email,
    },
    secret.secret,
    {}
  );
});

/* Create User */
router.post("/cadastrar", async (req, res) => {
  const { body = {} } = req;
  const { email, password } = body;

  try {
    const response = await User.create({
      email,
      password,
    });
    const hash = bcrypt.hashSync(password, 10);
    hash.password;
    response.save();
    return res.status(200).json({ message: "Create Success" });
  } catch (err) {
    return res.status(400).json({ message: "Error to Create a new account!" });
  }
});

module.exports = (app) => app.use("/", router);
