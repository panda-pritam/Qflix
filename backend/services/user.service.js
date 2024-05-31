const { User } = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
let getUserById = async (id) => {
  console.log("Id-> -> ->", id);
  let user = await User.findOne({ _id: id });

  return user;
};

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)
/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */

let getUserByEmail = async (email) => {
  //console.log("In get User by email ",email);
  let user = await User.findOne({ email });
  console.log(user);
  return user;
};

let createUser = async (user) => {
  console.log(
    "user email -> ",
    user.email,
    " -> ",
    User.isEmailTaken(user.email)
  );
  if (await User.isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.OK, "Email already taken");
  } else {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    let newUserObj = {
      ...user,
      password: hashedPassword,
    };
    let new_user = await User.create(newUserObj);
    return new_user;
  }
};

module.exports = { getUserById, createUser, getUserByEmail };
