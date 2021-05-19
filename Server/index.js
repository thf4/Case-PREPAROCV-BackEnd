const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Users", {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});

module.exports = mongoose;