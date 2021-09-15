const sequelize = require('../config/connection');
const { User, Plant, Category } = require('../models');

const userData = require('./userData.json');
const plantData = require('./plantData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const category of categoryData) {
    await Category.create({
      ...category,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const categories = await Category.findAll();

  for (const plant of plantData) {
    await Plant.create({
      ...plant,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
      category_id: categories[Math.floor(Math.random() * categories.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
