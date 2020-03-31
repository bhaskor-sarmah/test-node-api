const { Model } = require("sequelize");
const { commonModel, commonOptions } = require("./common.model.details");

module.exports = function(sequelize, DataTypes) {
  const { ENUM, STRING, TEXT } = DataTypes;
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

  return Users;
};
