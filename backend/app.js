let express = require("express");
let { errorHandler } = require("./middleware/error");
const cors = require("cors");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const ApiError = require("./utils/ApiError");
let router = require("./routes/videos.router");
const httpStatus = require("http-status");
let { authRout } = require("./routes/auth.route");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", (req, res) => {
  console.log("Server is up and running");
  res.send("Server is up and running");
});
app.use("/v1", router);
app.use("/v1", authRout);
app.use(errorHandler);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
