const sequelize = require("../config/connection");
const { User,Plant, Category } = require("../models");

const userData = require("./userData.json");
const plantData = require("./plantData.json");
const categoryData = require("./categoryData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Plant of plantData) {
    await Plant.create({
      ...Plant,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  
  await categoryData();

   

  process.exit(0);
};

seedDatabase();










