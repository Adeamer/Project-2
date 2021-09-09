const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Plant extends Model {}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    botanical_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sun_exposure: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    mature_size: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    soil_type: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    date_planted: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    watering_plan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "plant",
  }
);

module.exports = Plant;
