const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  console.log(" createUser received:", { firstname, lastname, email });

  if (!firstname || !email || !password) {
    throw new Error('All fields are required');
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname: lastname || "" // make sure it's always defined
    },
    email,
    password
  });

  return user;
};
