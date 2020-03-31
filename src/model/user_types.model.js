const { Model } = require("sequelize");
const { commonModel, commonOptions } = require("./common.model.details");

module.exports = function(sequelize, DataTypes) {
  class UserTypes extends Model {}

  UserTypes.init(commonModel, {
    ...commonOptions,
    modelName: "user_types",
    sequelize
  });

  UserTypes.beforeSync(() => {
    console.log("before creating the UserTypes table");
  });

  UserTypes.afterSync(() => {
    console.log("after creating the UserTypes table");
  });
  return UserTypes;
};
