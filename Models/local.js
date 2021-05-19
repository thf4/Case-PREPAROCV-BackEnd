const mongoose = require("../Server/index");

const LocalSchema = new mongoose.Schema({
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  zip: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  complement: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: false,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Local = mongoose.model("Local", LocalSchema);

module.exports = User;
