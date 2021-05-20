const cors = require("cors");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-PINGOTHER, Content-Type,Content-Length, Authorization"
    );
    app.use(cors());
    next();
  });
};