const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../Middlewares/secret.json");

/* Verify User */
router.post("/login", async (req, res) => {
  const { body = {} } = req;
  const { email, password } = body;
  const user = await User.findOne({ email: email }).lean();
  if (user) {
    bcrypt.compare(password, user.password, (err, equalpassword) => {
      if (equalpassword) {
        const token = jwt.sign(
          { _id: user._id, email: email },
          secret.secret,
          {}
        );
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Senha incorreta" });
      }
    });
  } else {
    return res.status(401).json({ message: "Usuario não cadastrado!" });
  }
});

/* Create User */
router.post("/cadastrar", async (req, res) => {
  const { body = {} } = req;
  const { email, password, password2 } = body;

  try {
    if (!email || /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      return res.status(401).json({ message: "Digite um email valido!" });
    }
    if ((password.length <= 5 && password2.length <= 5) || !password) {
      return res
        .status(401)
        .json({ message: "digite uma senha maior que 6 caracteres." });
    }
    if (password2 !== password || !password2) {
      return res
        .status(401)
        .json({ message: "Suas senhas precisam ser idênticas!" });
    }
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return res.status(401).json({ message: "Email ja cadastrado!" });
    }

    const response = await User.create({
      email,
      password,
      password2,
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
