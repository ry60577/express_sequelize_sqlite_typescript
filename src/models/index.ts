import { Sequelize } from 'sequelize';
import { DBConfig } from '../config/db.config';

const sequelizeConnection = new Sequelize(DBConfig.owgw);

export default sequelizeConnection;
//  Checking if connection is done
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((error) => console.log(error));
