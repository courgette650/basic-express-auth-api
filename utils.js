require("dotenv").config();
const bcrypt = require("bcrypt");

// const { SALT } = process.env;
const saltHash = async (string) => {
  return await bcrypt.hash(string, await bcrypt.genSalt(12));
};

const hashMatch = async (string, hashed) => {
  return await bcrypt.compare(string, hashed);
};

module.exports = {
  saltHash,
  hashMatch,
};
