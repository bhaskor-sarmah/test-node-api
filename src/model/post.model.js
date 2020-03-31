const { Model, TEXT, STRING } = require("sequelize");
const { commonModel, commonOptions } = require("./common.model.details");
const { sequelize } = require("../config/sequelize_config");

class Posts extends Model {}

Posts.init(
  {
    ...commonModel,
    title: {
      type: STRING({ length: 256 }),
      allowNull: false,
      unique: true
    },
    body: {
      type: TEXT,
      allowNull: false
    }
  },
  {
    ...commonOptions,
    modelName: "posts",
    sequelize
  }
);

Posts.beforeSync(() => {
  console.log("before creating the post table");
});

Posts.afterSync(() => {
  console.log("after creating the post table");
});

module.exports = Posts;
