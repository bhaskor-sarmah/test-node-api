const { Model, ENUM, TEXT, STRING } = require("sequelize");
const { commonModel, commonOptions } = require("./common.model.details");
const { sequelize } = require("../config/sequelize_config");
const posts = require("./post.model");

class Users extends Model {}

Users.init(
  {
    ...commonModel,
    firstName: {
      type: STRING({ length: 256 }),
      allowNull: false,
      unique: true,
      field: "first_name"
    },
    about: {
      type: TEXT,
      allowNull: true
    },
    email: {
      type: STRING({ length: 256 }),
      unique: true,
      allowNull: false
    },
    role: {
      type: ENUM(["user", "admin"]),
      defaultValue: "user"
    }
    //   ,
    //   password: {
    //     set() {
    //       return "hash....";
    //     },
    //     get() {}
    //   }
  },
  {
    ...commonOptions,
    modelName: "user",
    sequelize
  }
);

Users.beforeSync(() => {
  console.log("B4 creating the user table");
});

Users.afterSync(() => {
  console.log("after creating the user table");
});

Users.hasMany(posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
}); //

module.exports = Users;
