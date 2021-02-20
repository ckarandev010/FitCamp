const admin = require("../utils/base");

const db = admin.firestore();

const users = db.collection("Users");

module.exports.createUser = async ({ fname, lname, email, uid }) => {
  const new_user = await users.doc(uid).create({ fname, lname, email });
  return new_user.id;
};
