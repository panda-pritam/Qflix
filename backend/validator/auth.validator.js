let joi = require("joi");
let userData = {
  body: joi.object().keys({
    name: joi.string().required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
  }),
};
const loginData = {
  body: joi.object().keys({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
  }),
};

module.exports = { userData, loginData };
