const User = require("./User");
const Plant = require("./Plant");
const Category = require("./Category");

Plant.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Category.hasMany(Plant, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

User.hasMany(Plant, {
  foreignKey: "owner_id",
  onDelete: "CASCADE",
});

Plant.belongsTo(User, {
  foreignKey: "owner_id",
  onDelete: "CASCADE",
});


module.exports = { User, Plant, Category };

