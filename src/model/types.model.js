const { Model } = require("sequelize");
const { commonModel, commonOptions } = require("./common.model.details");

module.exports = function(sequelize, DataTypes) {
  const { ENUM } = DataTypes;
  class Types extends Model {}

  Types.init(
    {
      ...commonModel,
      type: {
        type: ENUM(["Type 1", "Type 2", "Type 3"]),
        allowNull: false,
        defaultValue: "Type 1"
      }
    },
    { ...commonOptions, modelName: "types", sequelize }
  );

  Types.beforeSync(() => {
    console.log("before creating the types table");
  });

  Types.afterSync(() => {
    console.log("after creating the types table");
  });
  return Types;
};
