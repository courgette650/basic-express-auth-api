const loggd = require("loggd");

const createUser = (db) => {
  return async (user) => {
    let u = await db.find({ email: user.email });
    console.log(u.result[0])
    if (u.result[0] !== undefined) throw "User already exist";
    return db.insert({
      ...user,
    });
  };
};

const getUsers = (db) => {
  return async () => {
    return (await db.find()).result || [];
  };
};

const getUserById = (db) => {
  return async (id) => {
    const user = await db.find({ _id: id });

    if (!user.result[0]) throw "User not found";
    return {
      ...user.result[0],
    };
  };
};

const getUserByEmail = (db) => {
  return async (email) => {
    const user = await db.find({ email });

    if (!user.result[0]) throw "User not found";
    return {
      ...user.result[0],
    };
  };
};

const initDatabase = async () => {
  const db = new loggd("users.json");

  return {
    createUser: createUser(db),
    getUsers: getUsers(db),
    getUserById: getUserById(db),
    getUserByEmail: getUserByEmail(db),
  };
};

module.exports = {
  initDatabase,
};
