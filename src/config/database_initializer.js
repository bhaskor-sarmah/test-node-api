const { sequelize } = require("./sequelize_config");
const user = require("../model/user.model");
const posts = require("../model/post.model");

const init = () => {
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Connection has been established successfully.");
      await user.sync({ force: true });
      await posts.sync({ force: true });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
};

module.exports = { init };
