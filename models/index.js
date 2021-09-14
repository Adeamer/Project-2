const User = require('./User');
const Plant = require('./Plant');
const Category = require('./Category');

// User to Category
User.hasMany(Category, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE',
});

Category.belongsTo(User, {
  foreignKey: 'owner_id',
});

// User to Plant

User.hasMany(Plant, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(User, {
  foreignKey: 'owner_id',
});

// Category to Plant

Category.hasMany(Plant, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(Category, {
  foreignKey: 'category_id',
});

module.exports = { User, Plant, Category };
