const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const Local = require("../Models/local");
const auth = require("../Middlewares/auth");

/* Update data */
router.put("/:_id", auth, async (req, res) => {
  const { body = {} } = req;
  const { email, name, surname, telephone, github, behance, linkedin } = body;
  try {
    const response = await User.findOne(_id, {
      name,
      surname,
      email,
      telephone,
      github,
      behance,
      linkedin,
    }).lean();
    const hash = bcrypt.hashSync(password, 10);
    hash.password;
    response.save();
    return res.status(200).json({ message: "Success Editing!" });
  } catch (err) {
    return res.status(401).json({ message: "Erro to Editing!" });
  }
});

/* Delete User */
router.delete("/:_id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params._id, () => {
      return res.json({
        message: "Deleted success!",
      });
    }).lean();
  } catch (err) {
    return res.status(400).json({
      message: "Erro too delete!",
    });
  }
});

/* Local updating post */

router.put("/:_id", auth, async (req, res) => {
  const { body = {} } = req;
  const { state, zip, district, address, city, complement } = body;

  try {
    const response = await Local.findOne(_id, {
      state,
      zip,
      district,
      address,
      city,
      complement,
    });
    response.save();
    return res.status(200).json({
      message: "Success Update!",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Erro too Update!",
    });
  }
});

/* Route Location create */
router.post("/local", auth, async (req, res) => {
  const { body = {} } = req;
  const { state, zip, district, address, city, complement } = body;

  try {
    const response = await Local.create({
      state,
      zip,
      district,
      address,
      city,
      complement,
    });
    response.save();
    return res.status(200).json({
      message: "Success Update Location !",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Erro to Create Location!",
    });
  }
});

module.exports = router;
