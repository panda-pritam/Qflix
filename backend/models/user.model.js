const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
// const { jwt } = require("../config/config");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
let validate = require("mongoose-validator");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
//const config = require("../config/config");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
    password: {
      type: String,
      validate: {
        validator(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error(
              "Password must contain at least one letter and one number"
            );
          }
          return true;
        },
        message: "Password must contain at least one letter and one number",
      },
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  let user = await this.findOne({ email });
  return !!user; // this user is empty !user -> true -> !true -> false;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  let user = this;
  console.log("User.passward-> ", user.password, ", Passward-> ", password);
  return await bcrypt.compare(password, user.password);
};

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS

/**
 * Check if user have set an address other than the default address
 * - should return true if user has set an address other than default address
 * - should return false if user's address is the default address
 *
 * @returns {Promise<boolean>}
 */

/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */

let User = mongoose.model("User", userSchema);
module.exports = { User };
