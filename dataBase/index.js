import { Sequelize } from 'sequelize';
import { User } from './models/UserModel';

const sequelize = new Sequelize('database', 'username', 'password', {
  // host: 'localhost',
  // dialect: 'mysql'
  dialect: 'sqlite',
  storage: './myDB.sqlite'
});

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

export default {
    syncModels,
    sequelize,
    User
  }