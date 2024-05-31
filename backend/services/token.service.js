const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, type, secret = config.jwt.secret) => {
  let Payload = {
    sub: userId,

    iat: Math.floor(Date.now() / 1000),
    type,
  };
  return jwt.sign(Payload, secret);
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
  //config.jwt
  let userId = user._id;

  let type = tokenTypes.ACCESS;
  let token = generateToken(userId, type);
  //console.log("date-> ",new Date(expire));

  return {
    access: {
      token: token,
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
