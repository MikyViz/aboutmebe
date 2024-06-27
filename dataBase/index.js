import sequelize from './db-sqlite.js';
import User from './models/UserModel.js';
import Review from './models/ReviewModel.js';

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
    User,
    Review
  }