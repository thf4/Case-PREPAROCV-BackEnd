const express = require("express");
const app = express();
const data = require("./Routers/local");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./Middlewares/cors")(app);
require("./Routers/user")(app);
app.use("/user", data);

app.listen(3000, function () {
  console.log('Listening Port: ', this.address().port);
  console.log('Server on. ');
});