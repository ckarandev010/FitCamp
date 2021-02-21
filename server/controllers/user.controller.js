const chalk = require("chalk");
const User = require("../models/User");

module.exports.register = async (req, res, next) => {
  try {
    const { fname, lname, email, uid } = req.body;
    console.log(chalk.yellow("Creating user..."));
    const user_id = await User.create({ fname, lname, email, uid });
    console.log(chalk.green("Created!"));

    res.status(200).send({
      statusCode: 200,
      msg: "Successfully created user!",
      data: { user_id },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.analyse = async (req, res, next) => {
  try {
    const { uid, bodyFatPercentage, target } = req.body;
    //TODO:Get exercises
    console.log(chalk.yellow("Adding a new entry..."));
    await User.newEntry({
      uid,
      timeStamp: new Date().getTime(),
      bodyFatPercentage,
      target,
    });
    console.log(chalk.green("Done!"));
    res.status(200).send({
      statusCode: 200,
      msg: "Successfully added new entry",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getProgress = async (req, res, next) => {
  try {
    const { uid } = req.query;
    const progress = await User.getProgress(uid);
    res.status(200).send({
      statusCode: 200,
      msg: "Successfully retrieved progress",
      data: { progress },
    });
  } catch (e) {
    next(e);
  }
};
