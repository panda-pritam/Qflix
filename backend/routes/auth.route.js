let express = require("express");
let router = express.Router();
let { userData, loginData } = require("../validator/auth.validator");
let reqBodyValidater = require("../middleware/validateReqBody");

let { register, login } = require("../controller/auth.controller");

router.post("/user", reqBodyValidater(userData), register);
router.post("/login", reqBodyValidater(loginData), login);

module.exports = { authRout: router };
