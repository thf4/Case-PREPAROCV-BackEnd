const express = require("express");
const app = express();
const data = require("./Routers/local");

require("./Middlewares/cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./Routers/user")(app);
app.use("/user", data);

app.listen(3000);
