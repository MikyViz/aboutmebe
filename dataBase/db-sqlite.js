import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('AboutMeDB', 'miky', 'vizenovsky', {
  // host: 'localhost',
  // dialect: 'mysql'
  dialect: 'sqlite',
  storage: './myDB.sqlite'
});

export default sequelize;
