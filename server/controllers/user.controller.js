const User = require("../models/User");

module.exports.register = async (req, res, next) => {
  try {
    const { fname, lname, email, uid } = req.body;
    const user_id = await User.createUser({ fname, lname, email, uid });
    res.status(200).send({
      statusCode: 200,
      msg: "Successfully created user!",
      data: { user_id },
    });
  } catch (e) {
    next(e);
  }
};
