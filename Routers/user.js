const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../Middlewares/secret.json");

/* Verify User */
router.post("/login", async (req, res) => {
  const { body = {} } = req;
  const { email, password, id } = body;
  const user = await User.findOne({ email: email }).lean();
  if (user) {
    await bcrypt.compare(user.password, password);
    if (user.password) {
      const token = jwt.sign({ _id: id, email: email }, secret.secret, {});
      return res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Password Wrong" });
    }
  } else {
    res.status(401).json({ message: "User don't find!" });
  }
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
    response.password = hash;
    response.save();
    return res.status(200).json({ message: "Create Success" });
  } catch (err) {
    return res.status(400).json({ message: "Error to Create a new account!" });
  }
});

module.exports = (app) => app.use("/", router);
