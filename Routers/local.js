const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const auth = require("../Middlewares/auth");

/* Update data */
router.put("/:_id", auth, async (req, res) => {
  const { body = {} } = req;
  const { email, name, surname, telephone, github, behance, linkedin } = body;
  try {
    const response = await User.findOne({
      name,
      surname,
      email,
      telephone,
      github,
      behance,
      linkedin,
    }).lean();
    const hash = bcrypt.hashSync(password, 10);
    response.password = hash;
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

router.put("/local/:_id", auth, async (req, res) => {
  const { body = {} } = req;
  const { statee, zip, district, address, city, complement } = body;

  try {
    const response = await User.findOne(_id, {
      statee,
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

module.exports = router;
