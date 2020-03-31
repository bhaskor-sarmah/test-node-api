const { sequelize } = require("./sequelize_config");
const User = sequelize.import("../model/user.model.js");
const Posts = sequelize.import("../model/post.model.js");
const Types = sequelize.import("../model/types.model.js");
const UserTypes = sequelize.import("../model/user_types.model.js");

const init = () => {
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Connection has been established successfully.");
      defineRelations();
      await User.sync({ force: true });
      await Posts.sync({ force: true });
      await Types.sync({ force: true });
      await UserTypes.sync({ force: true });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  const defineRelations = () => {
    const common = options => ({
      ...options,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    User.hasMany(Posts, common({ foreignKey: "user_id" }));

    User.belongsToMany(
      Types,
      common({
        through: "user_types",
        foreignKey: "user_id",
        otherKey: "type_id"
      })
    );

    Types.belongsToMany(
      User,
      common({
        through: "user_types",
        foreignKey: "type_id",
        otherKey: "user_id"
      })
    );

    UserTypes.belongsTo(Types, { foreignKey: "type_id" });
    UserTypes.belongsTo(User, { foreignKey: "user_id" });

    User.hasMany(UserTypes, common({ foreignKey: "user_id" }));
    Types.hasMany(UserTypes, common({ foreignKey: "type_id" }));
  };
};

module.exports = { init };
