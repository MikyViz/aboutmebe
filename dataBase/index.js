import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('AboutMeDB', 'miky', 'vizenovsky', {
  // host: 'localhost',
  // dialect: 'mysql'
  dialect: 'sqlite',
  storage: './myDB.sqlite'
});

import defineUserModel from './models/UserModel.js';
const User = defineUserModel(sequelize);

const syncModels = async () => {
  try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await sequelize.sync();
      console.log("All models were synchronized successfully.");
  } catch (error) {
      console.error("Unable to connect to the database:", error);
  }
}

export {
    syncModels,
    sequelize,
    User
  }